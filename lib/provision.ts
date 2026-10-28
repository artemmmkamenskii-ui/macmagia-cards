/**
 * Выдача доступа к колодам на платформе lk.macmagia.ru.
 *
 * Раньше после оплаты уходило письмо со ссылками на Яндекс.Диск (lib/email.ts).
 * Оказалось, что Яндекс не отдаёт архив папки — запрос ссылки на скачивание
 * возвращает InternalServerError, и покупательницы не могут забрать колоды.
 * Теперь архивы лежат в нашем бакете, а доступ открывается на платформе:
 * она заводит ученицу, открывает купленные колоды и шлёт логин с паролем.
 *
 * Каждой колоде на платформе соответствует курс `deck-<id товара>` с тарифом
 * `bazovyy` (см. scripts/seed-decks.cjs в проекте платформы). Все купленные
 * колоды выдаются ОДНИМ вызовом: провижн генерит пароль при каждом обращении,
 * и несколько вызовов подряд перетёрли бы пароли друг друга.
 *
 * PROVISION_SECRET совпадает с одноимённой переменной в .env платформы и
 * живёт только в серверном окружении.
 */

const DEFAULT_URL = "https://lk.macmagia.ru/api/provision";

export interface ProvisionInput {
  email: string;
  name: string | null;
  /** Слаги курсов-колод: deck-k-sebe, deck-mama, … */
  courseSlugs: string[];
  planSlug: string;
  yookassaPaymentId: string;
  amountKopecks: number;
}

export type ProvisionResult =
  | { ok: true; mode: "mock" }
  | { ok: true; mode: "live"; alreadyProcessed: boolean };

/** 4xx — ошибка конфигурации (секрет, опечатка в слагах). Ретраить бессмысленно. */
export class ProvisionFatalError extends Error {
  constructor(
    public readonly status: number,
    message: string
  ) {
    super(message);
    this.name = "ProvisionFatalError";
  }
}

export function isProvisionConfigured() {
  return Boolean((process.env.LK_PROVISION_URL || DEFAULT_URL) && process.env.PROVISION_SECRET);
}

/** id товара в магазине → слаг курса-колоды на платформе. */
export function deckCourseSlug(productId: string) {
  return `deck-${productId}`;
}

export function getPlanSlug() {
  return process.env.LK_PLAN_SLUG || "bazovyy";
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function provisionDeckAccess(input: ProvisionInput): Promise<ProvisionResult> {
  const url = process.env.LK_PROVISION_URL || DEFAULT_URL;
  const secret = process.env.PROVISION_SECRET;

  if (!secret) {
    console.warn("[provision] PROVISION_SECRET не задан — пропускаю запрос (mock).", {
      email: input.email,
      yookassaPaymentId: input.yookassaPaymentId
    });
    return { ok: true, mode: "mock" };
  }

  const maxAttempts = Math.max(1, Number(process.env.LK_PROVISION_MAX_ATTEMPTS || 3));
  const retryDelayMs = Math.max(0, Number(process.env.LK_PROVISION_RETRY_DELAY_MS || 3000));

  const body = JSON.stringify({
    email: input.email,
    name: input.name,
    courseSlugs: input.courseSlugs,
    planSlug: input.planSlug,
    yookassaPaymentId: input.yookassaPaymentId,
    amountKopecks: input.amountKopecks
  });

  let lastError: unknown;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-provision-secret": secret },
        body
      });

      if (response.ok) {
        const data = (await response.json().catch(() => ({}))) as {
          ok?: boolean;
          alreadyProcessed?: boolean;
        };
        return { ok: true, mode: "live", alreadyProcessed: Boolean(data.alreadyProcessed) };
      }

      if (response.status >= 400 && response.status < 500) {
        const text = await response.text().catch(() => "");
        throw new ProvisionFatalError(
          response.status,
          `Provision failed (${response.status}): ${text || response.statusText}`
        );
      }

      const text = await response.text().catch(() => "");
      lastError = new Error(`Provision ${response.status}: ${text || response.statusText}`);
    } catch (error) {
      if (error instanceof ProvisionFatalError) throw error;
      lastError = error;
    }

    if (attempt < maxAttempts) await delay(retryDelayMs);
  }

  throw lastError instanceof Error
    ? lastError
    : new Error(`Provision failed after ${maxAttempts} attempts`);
}
