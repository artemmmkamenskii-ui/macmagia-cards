# Лендинг электронных колод

Мини-лендинг на `Next.js` для продажи цифровых колод с оплатой через `ЮKassa` и автоматической отправкой письма со ссылкой на `Яндекс Диск`.

## Что уже есть

- первый экран, ассортимент, преимущества, FAQ и финальный CTA;
- создание платежа через `app/api/payment/create`;
- webhook успешной оплаты в `app/api/payment/webhook`;
- отправка письма через `Resend API`;
- страницы `success`, `policy`, `offer`.

## Настройки

Заполните переменные в `.env.local`:

- `NEXT_PUBLIC_SITE_URL` — адрес сайта;
- `YOOKASSA_SHOP_ID` и `YOOKASSA_SECRET_KEY` — доступы магазина;
- `YOOKASSA_WEBHOOK_SECRET` — ваш дополнительный секрет для webhook, если используете его;
- `RESEND_API_KEY` — ключ сервиса отправки писем;
- `DELIVERY_FROM_EMAIL` — email отправителя, подтвержденный в Resend.

## Важное перед запуском

- замените тестовые ссылки Яндекс Диска в `data/products.ts`;
- замените черновые тексты на ваши реальные тексты;
- подставьте юридические данные в страницы `policy` и `offer`;
- настройте webhook ЮKassa на маршрут `/api/payment/webhook`.

## Автодеплой через GitHub Actions

После настройки workflow `.github/workflows/deploy.yml` достаточно сделать `git push` в `main`:

1. Проект отправится на сервер в `~/macmagia` через `rsync`;
2. На сервере выполнятся `npm install`, `npm run build`, `pm2 restart macmagia`.

Добавьте в `GitHub -> Settings -> Secrets and variables -> Actions` секреты:

- `DEPLOY_HOST` — IP сервера (например `103.76.55.254`);
- `DEPLOY_PORT` — порт SSH (`22`);
- `DEPLOY_USER` — пользователь сервера (`ubuntu`);
- `DEPLOY_SSH_KEY` — приватный SSH-ключ для доступа на сервер.
