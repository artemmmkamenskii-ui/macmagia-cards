# Лендинг электронных колод

Мини-лендинг на `Next.js` для продажи цифровых колод с оплатой через `ЮKassa` и автоматической отправкой письма со ссылкой на `Яндекс Диск`.

Сайт отдаётся с публичного префикса **`/cards`** (`basePath` в `next.config.ts`, константа `BASE_PATH` в `lib/basePath.ts`). Локально главная: `http://localhost:3000/cards`.

## Что уже есть

- первый экран, ассортимент, преимущества, FAQ и финальный CTA;
- создание платежа через `app/api/payment/create`;
- webhook успешной оплаты в `app/api/payment/webhook`;
- отправка письма через `UniSender API`;
- страницы `success`, `policy`, `offer`.

## Настройки

Заполните переменные в `.env.local`:

- `NEXT_PUBLIC_SITE_URL` — **корень сайта без** `/cards` (например `https://example.com` или `http://localhost:3000`). Код сам добавит `/cards` для `return_url` ЮKassa и публичных ссылок;
- `YOOKASSA_SHOP_ID` и `YOOKASSA_SECRET_KEY` — доступы магазина;
- `YOOKASSA_WEBHOOK_SECRET` — ваш дополнительный секрет для webhook, если используете его;
- `UNISENDER_API_KEY` — ключ доступа к API в кабинете UniSender;
- `UNISENDER_LIST_ID` — ID списка контактов в UniSender (нужен для `sendEmail`);
- `DELIVERY_FROM_EMAIL` — email отправителя, подтвержденный в UniSender;
- `DELIVERY_FROM_NAME` — имя отправителя в письме (опционально, по умолчанию `MacMagia`).

## Важное перед запуском

- замените тестовые ссылки Яндекс Диска в `data/products.ts`;
- замените черновые тексты на ваши реальные тексты;
- подставьте юридические данные в страницы `policy` и `offer`;
- настройте webhook ЮKassa на URL вида `https://ВАШ_ДОМЕН/cards/api/payment/webhook` (секрет в заголовке `x-webhook-secret`, если используете `YOOKASSA_WEBHOOK_SECRET`).

## Снять редирект nginx с `/` на `/cards/`

Редирект настраивается **на сервере в nginx**, не в Next. Скрипт: `deploy/remove-nginx-root-to-cards.sh` (после `rsync` лежит в `~/macmagia/deploy/`). На сервере вручную:

```bash
sudo bash ~/macmagia/deploy/remove-nginx-root-to-cards.sh
```

При деплое GitHub Actions пытается запустить тот же скрипт по SSH; для этого пользователю деплоя нужен **sudo без пароля** на команды из скрипта (или один раз запусти скрипт вручную на сервере с `sudo bash …`).

## Продакшн: корень `/` и витрина `/cards`

Само приложение Next живёт **только под** `/cards`. **Корень сайта** (`/`) в этом репозитории не настраивается: под него сделай **отдельный лендинг** (статика или другой проект) и **убери** в nginx старый редирект `location = /` → `/cards/`, если он остался.

Прокидывай в Node (pm2) запросы с префиксом `/cards` (и вложенные пути, API, `_next`):

```nginx
location /cards/ {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
}
```

Корень `location /` задай на каталог с главным лендингом или на другой бэкенд.

## Автодеплой через GitHub Actions

После настройки workflow `.github/workflows/deploy.yml` достаточно сделать `git push` в `main`:

1. Проект отправится на сервер в `~/macmagia` через `rsync`;
2. На сервере выполнятся `npm install`, `npm run build`, `pm2 restart macmagia`.

Добавьте в `GitHub -> Settings -> Secrets and variables -> Actions` секреты:

- `DEPLOY_HOST` — IP сервера (например `103.76.55.254`);
- `DEPLOY_PORT` — порт SSH (`22`);
- `DEPLOY_USER` — пользователь сервера (`ubuntu`);
- `DEPLOY_SSH_KEY` — приватный SSH-ключ для доступа на сервер.
