# Ссылки на колоды (Яндекс Диск)

Документ для быстрого ручного отправления ссылок покупателям, если автоматическая доставка по почте не сработала.

| Колода | ID товара | Ссылка |
|---|---|---|
| К себе. 53 дня | `k-sebe` | https://disk.yandex.ru/d/vhplzuuapSXnSw |
| Ты и я. Мы | `ty-i-ya` | https://disk.yandex.ru/d/HZgQAE0_08wneA |
| Моё тело — мой дом | `moe-telo` | https://disk.yandex.ru/d/lzbizJ8sP-KNPQ |
| Пусть. Дыши | `dyshi` | https://disk.yandex.ru/d/aTXZj-GS5Ltz0A |
| Женский круг. Мужской путь | `zhenskiy-krug-muzhskoy-put` | https://disk.yandex.ru/d/nF-9wqt4R8dqKQ |
| Источник. Путь к себе | `istochnik` | https://disk.yandex.ru/d/Yq9NuXsBnVqpwA |
| Магия внутри | `magiya-vnutri` | https://disk.yandex.ru/d/6iTeLBDrcl9VYw |
| Я и моя мама | `mama` | https://disk.yandex.ru/d/c89xTJabatOSkg |

## Как переотправить письмо клиенту вручную

1. Найти платёж в кабинете ЮКассы → скопировать ID платежа (вида `318xxxxx-...`)
2. На сервере или с любого компьютера выполнить:

```bash
curl -X POST https://macmagia.ru/cards/api/payment/webhook \
  -H "Content-Type: application/json" \
  -d '{"event":"payment.succeeded","object":{"id":"PASTE_PAYMENT_ID_HERE"}}'
```

3. Должно вернуться `{"ok":true}` — письмо отправлено.

Если в логах сервера видна предыдущая успешная отправка для этого `payment_id` — система не отправит дубль (защита от повторов). В этом случае нужно удалить запись из `/tmp/macmagia-processed-payments.json` на сервере и повторить.

## Источник данных

Реальные названия и ссылки колод хранятся в [data/products.ts](data/products.ts). Этот документ — копия для удобства.
