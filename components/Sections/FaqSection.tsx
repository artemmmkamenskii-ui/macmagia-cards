const faqItems = [
  {
    question: "Как я получу колоду после оплаты?",
    answer:
      "После успешной оплаты система автоматически отправит письмо на ваш email. В письме будет ссылка на нужную колоду на Яндекс Диске."
  },
  {
    question: "Через сколько приходит письмо?",
    answer:
      "Обычно письмо приходит в течение нескольких минут после подтверждения оплаты. Если не видите письмо, проверьте папку Спам."
  },
  {
    question: "Можно ли использовать колоды в онлайн-консультациях?",
    answer:
      "Да, колоды подготовлены именно так, чтобы их было удобно открывать, показывать на экране и применять в онлайн-работе."
  }
];

export default function FaqSection() {
  return (
    <section className="section" id="faq">
      <div className="section-heading">
        <p className="eyebrow">FAQ</p>
        <h2>Частые вопросы перед покупкой</h2>
      </div>

      <div className="faq-list">
        {faqItems.map((item) => (
          <article key={item.question} className="faq-item">
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
