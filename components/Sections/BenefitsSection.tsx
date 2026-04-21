const benefits = [
  {
    title: "💻 Идеально для онлайн-работы и консультаций",
    text: "Электронные колоды созданы для дистанционного формата. Легко демонстрировать карты через Zoom, Skype или Telegram, не теряя качество изображения и не занимая место на столе."
  },
  {
    title: "🎨 Идеальное качество без износа",
    text: "Цифровое изображение не выцветает, не царапается и не теряет цвета. Каждая карта выглядит как в день покупки даже через годы использования."
  },
  {
    title: "😎 Мобильность без компромиссов",
    text: "Носите с собой хоть 10 колод. Вес и объем равны нулю, а выбор тем - огромный."
  }
];

export default function BenefitsSection() {
  return (
    <section className="section section--soft">
      <div className="section-heading">
        <p className="eyebrow">Почему это удобно</p>
        <h2>Почему это удобно:</h2>
      </div>

      <div className="benefits-grid">
        {benefits.map((benefit) => (
          <article key={benefit.title} className="benefit-card">
            <h3>{benefit.title}</h3>
            <p>{benefit.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
