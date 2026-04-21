import ClearCartOnSuccess from "@/components/ClearCartOnSuccess";

export default function SuccessPage() {
  return (
    <main className="simple-page">
      <ClearCartOnSuccess />
      <div className="simple-page__card">
        <p className="eyebrow">Оплата принята</p>
        <h1>Спасибо за заказ</h1>
        <p>
          Если платеж подтвержден, письмо со ссылками на все купленные колоды будет отправлено на
          указанный email автоматически.
        </p>
        <a className="button button--primary" href="/">
          Вернуться на лендинг
        </a>
      </div>
    </main>
  );
}
