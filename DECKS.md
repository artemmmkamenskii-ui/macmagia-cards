# Колоды: как выдаётся доступ и что делать руками

С 28.10.2026 после оплаты покупательница получает **доступ в личный кабинет**
lk.macmagia.ru: письмо с логином и паролем, в кабинете открыты только
оплаченные колоды, каждая скачивается одним ZIP-архивом.

Раньше уходило письмо со ссылками на Яндекс.Диск. От них отказались: Яндекс
не отдаёт папку архивом — запрос ссылки на скачивание возвращает
`InternalServerError`, и покупательницы не могли забрать колоды.
**Старые ссылки покупателям не отправлять** — см. раздел в конце.

## Таблица соответствий

Архивы лежат в бакете `macmagiakursi` под приватным префиксом `course-decks/`;
прямой ссылкой их не скачать, кабинет отдаёт подписанную ссылку на несколько часов.

| Колода | ID товара в магазине | Курс на платформе | Архив в бакете |
|---|---|---|---|
| К себе. 53 дня | `k-sebe` | `deck-k-sebe` | `course-decks/k-sebe.zip` |
| Ты и я. Мы | `ty-i-ya` | `deck-ty-i-ya` | `course-decks/ty-i-ya.zip` |
| Моё тело — мой дом | `moe-telo` | `deck-moe-telo` | `course-decks/moe-telo.zip` |
| Пусть. Дыши | `dyshi` | `deck-dyshi` | `course-decks/dyshi.zip` |
| Женский круг. Мужской путь | `zhenskiy-krug-muzhskoy-put` | `deck-zhenskiy-krug-muzhskoy-put` | `course-decks/zhenskiy-krug-muzhskoy-put.zip` |
| Источник. Путь к себе | `istochnik` | `deck-istochnik` | `course-decks/istochnik.zip` |
| Магия внутри | `magiya-vnutri` | `deck-magiya-vnutri` | `course-decks/magiya-vnutri.zip` |
| Я и моя мама | `mama` | `deck-mama` | `course-decks/mama.zip` |

Слаг курса — всегда `deck-` + ID товара (`lib/provision.ts`, `deckCourseSlug`).
Курсы и тарифы создаёт `scripts/seed-decks.cjs` в проекте платформы.

## Способ 1: переотправить вебхук (если платёж есть в ЮKassa)

Магазин сам запросит платёж, проверит оплату и выдаст доступ.

1. Найти платёж в кабинете ЮKassa → скопировать ID (вида `3272793f-...`).
2. Выполнить:

```bash
curl -X POST https://macmagia.ru/cards/api/payment/webhook \
  -H "Content-Type: application/json" \
  -d '{"event":"payment.succeeded","object":{"id":"СЮДА_ID_ПЛАТЕЖА"}}'
```

Ответ `{"ok":true}` — доступ выдан, письмо ушло. Если доступ по этому платежу
уже выдавался, повтор игнорируется: ID лежит в
`/tmp/macmagia-processed-payments.json` на сервере, а платформа вторично не
проводит платёж с тем же `yookassaId`. Чтобы заставить повтор, удалите запись
из этого файла — но помните, что **повторная выдача генерирует новый пароль**,
старый перестанет работать.

## Способ 2: выдать доступ напрямую (платежа в ЮKassa нет — подарок, обмен, старая покупка)

Секрет не печатаем и не копируем в переписку — читаем его на сервере в том же
вызове. Все колоды одной покупательницы выдаём **одним запросом**: провижн
генерит пароль при каждом обращении, и вызовы по одной перетёрли бы пароли
друг друга.

```bash
ssh -i ~/.ssh/macmagia_admin ubuntu@159.194.240.232 'bash -s' <<'EOF'
S=$(grep "^PROVISION_SECRET=" /home/ubuntu/macmagia-lk/.env | cut -d= -f2-)
curl -s -o /dev/stdout -w "\nHTTP %{http_code}\n" -X POST https://lk.macmagia.ru/api/provision \
  -H "Content-Type: application/json" -H "x-provision-secret: $S" \
  -d '{"email":"pochta@example.com","name":"Имя","courseSlugs":["deck-k-sebe","deck-mama"],"planSlug":"bazovyy","yookassaPaymentId":"ручная-выдача-2026-10-28-pochta","amountKopecks":0}'
EOF
```

- `courseSlugs` — только оплаченные колоды, иначе откроются лишние.
- `yookassaPaymentId` — любая уникальная строка; она же защищает от дублей,
  поэтому для каждой выдачи своя.
- Если хоть один слаг написан с опечаткой, запрос вернёт
  `404 Plan not found: <слаг>/bazovyy` и **не сделает ничего** — частичной
  выдачи не бывает.

## Если покупательница пишет «ничего не открывается»

1. Проверить, дошло ли письмо: `pm2 logs macmagia --lines 200 | grep provisioned`.
2. Пароль можно только выдать заново (способ 1 или 2) — посмотреть старый нельзя,
   в базе лежит хэш.
3. Вход — на lk.macmagia.ru, логин = адрес почты из заказа.

## Архив: старые ссылки на Яндекс.Диск

Это исходники, из которых собраны архивы в бакете. **Покупателям не отправлять**
— скачивание папки у Яндекса не работает, именно на это и жаловались.

<details>
<summary>Показать ссылки</summary>

| Колода | Ссылка |
|---|---|
| К себе. 53 дня | https://disk.yandex.ru/d/vhplzuuapSXnSw |
| Ты и я. Мы | https://disk.yandex.ru/d/HZgQAE0_08wneA |
| Моё тело — мой дом | https://disk.yandex.ru/d/lzbizJ8sP-KNPQ |
| Пусть. Дыши | https://disk.yandex.ru/d/aTXZj-GS5Ltz0A |
| Женский круг. Мужской путь | https://disk.yandex.ru/d/nF-9wqt4R8dqKQ |
| Источник. Путь к себе | https://disk.yandex.ru/d/Yq9NuXsBnVqpwA |
| Магия внутри | https://disk.yandex.ru/d/6iTeLBDrcl9VYw |
| Я и моя мама | https://disk.yandex.ru/d/c89xTJabatOSkg |

</details>
