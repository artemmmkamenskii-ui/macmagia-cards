/** Публичный URL-префикс приложения. Должен совпадать с `basePath` в `next.config.ts`. */
export const BASE_PATH = "/cards" as const;

/** Путь относительно корня сайта, с учётом `BASE_PATH` (для `fetch` и вне `next/link` / `next/image`). */
export function withBasePath(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_PATH}${normalized}`;
}

/**
 * База URL для редиректов ЮKassa и публичных ссылок.
 * `NEXT_PUBLIC_SITE_URL` — origin без хвоста `/cards` (например `https://example.com`).
 */
export function getPublicAppUrl(): string {
  const origin = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
  if (origin.endsWith(BASE_PATH)) {
    return origin;
  }
  return `${origin}${BASE_PATH}`;
}
