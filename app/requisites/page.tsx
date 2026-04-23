import Link from "next/link";

export default function RequisitesPage() {
  return (
    <main className="simple-page">
      <div className="simple-page__card simple-page__card--wide">
        <p className="eyebrow">Реквизиты</p>
        <h1>Реквизиты продавца</h1>

        <section className="requisites-block" aria-labelledby="requisites-seller">
          <h2 id="requisites-seller" className="requisites-block__title">
            Индивидуальный предприниматель
          </h2>
          <p>
            <strong>Наименование:</strong> ИНДИВИДУАЛЬНЫЙ ПРЕДПРИНИМАТЕЛЬ КАМЕНСКАЯ ЕКАТЕРИНА
            ВЛАДИМИРОВНА
          </p>
          <p>
            <strong>ИНН:</strong> 732808256904
          </p>
          <p>
            <strong>ОГРНИП:</strong> 319732500013182
          </p>
          <p>
            <strong>Расчётный счёт:</strong> 40802810338000290528
          </p>
        </section>

        <section className="requisites-block" aria-labelledby="requisites-bank">
          <h2 id="requisites-bank" className="requisites-block__title">
            Банк
          </h2>
          <p>
            <strong>Наименование:</strong> ПАО Сбербанк
          </p>
          <p>
            <strong>БИК:</strong> 044525225
          </p>
          <p>
            <strong>Кор. счёт:</strong> 30101810400000000225
          </p>
          <p>
            <strong>ИНН:</strong> 7707083893
          </p>
          <p>
            <strong>КПП:</strong> 773643001
          </p>
          <p>
            <strong>Дата открытия:</strong> 22.12.2021
          </p>
          <p>
            <strong>Адрес обслуживающего подразделения:</strong> г. Москва, ул. Садовая-Кудринская, д.{" "}
            25
          </p>
        </section>

        <p>
          <Link className="button button--secondary" href="/">
            Назад на главную
          </Link>
        </p>
      </div>
    </main>
  );
}
