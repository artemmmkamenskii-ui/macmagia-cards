export type Product = {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  format: string;
  description: string;
  highlights: string[];
  placeholderNote: string;
  detailText: string;
  gallery: string[];
  yandexDiskUrl: string;
  coverImageSrc?: string;
};

function buildGallery(folder: string, count: number) {
  return Array.from({ length: count }, (_, index) => `/decks/${folder}/${index + 1}.jpg`);
}

export type HeroSlide = {
  id: string;
  title: string;
  caption: string;
  placeholderNote: string;
  imageSrc?: string;
};

export const products: Product[] = [
  {
    id: "k-sebe",
    title: "К себе. 53 дня",
    subtitle: "Колода для возвращения к себе и внутренней опоре",
    price: 190,
    format: "PDF + JPG",
    description: "53 карты, 53 вопроса — ежедневный ритуал саморефлексии. Колода ведёт к себе через честные вопросы. Без оценок и правильных ответов.",
    highlights: [
      "В комплекте: инструкция с практиками использования. PDF для печати."
    ],
    placeholderNote: "К себе. 53 дня",
    coverImageSrc: "/decks/k-sebe/1.jpg",
    detailText: "53 карты, 53 вопроса — ежедневный ритуал саморефлексии. Колода ведёт к себе через честные вопросы. Без оценок и правильных ответов.",
    gallery: buildGallery("k-sebe", 6),
    yandexDiskUrl: "https://disk.yandex.ru/d/example-k-sebe"
  },
  {
    id: "ty-i-ya",
    title: "Ты и я. Мы",
    subtitle: "Для тем отношений, границ и честного диалога",
    price: 190,
    format: "PDF + JPG",
    description: "45 карт для работы с созависимостью, границами и возвращением к себе.",
    highlights: [
      "Три раздела: где я? куда иду? кто я без тебя?",
      "В комплекте: структура сессии, техники для себя и специалистов. PDF."
    ],
    placeholderNote: "Ты и я. Мы",
    coverImageSrc: "/decks/ty-i-ya/1.jpg",
    detailText: "45 карт для работы с созависимостью, границами и возвращением к себе.",
    gallery: buildGallery("ty-i-ya", 6),
    yandexDiskUrl: "https://disk.yandex.ru/d/example-ty-i-ya"
  },
  {
    id: "moe-telo",
    title: "Моё тело — мой дом",
    subtitle: "Для примирения с телом и заботы о себе",
    price: 190,
    format: "PDF + JPG",
    description: "56 карт для тех, кто устал воевать с собой.",
    highlights: [
      "Три раздела: поле битвы → корни войны → возвращение домой.",
      "В комплекте: телесные практики, вопросы для самоисследования. PDF."
    ],
    placeholderNote: "Моё тело — мой дом",
    coverImageSrc: "/decks/moe-telo/1.jpg",
    detailText: "56 карт для тех, кто устал воевать с собой.",
    gallery: buildGallery("moe-telo", 5),
    yandexDiskUrl: "https://disk.yandex.ru/d/example-moe-telo"
  },
  {
    id: "dyshi",
    title: "Пусть. Дыши",
    subtitle: "Для работы с тревогой и возвращения в спокойствие",
    price: 190,
    format: "PDF + JPG",
    description: "45 карт для работы с тревогой и паническими атаками.",
    highlights: [
      "Три шага: признать → понять → выдохнуть.",
      "Техники заземления и дыхания прямо на картах.",
      "В комплекте: инструкция с техниками. PDF."
    ],
    placeholderNote: "Пусть. Дыши",
    coverImageSrc: "/decks/dyshi/1.jpg",
    detailText: "45 карт для работы с тревогой и паническими атаками.",
    gallery: buildGallery("dyshi", 7),
    yandexDiskUrl: "https://disk.yandex.ru/d/example-dyshi"
  },
  {
    id: "zhenskiy-krug-muzhskoy-put",
    title: "Женский круг. Мужской путь",
    subtitle: "Для исследования женско-мужской динамики в отношениях",
    price: 190,
    format: "PDF + JPG",
    description: "43 карты с архетипами сказок (Василиса, Баба-яга, Иван-царевич и др.).",
    highlights: [
      "На каждой карте: образ, вопрос и мягкая подсказка.",
      "В комплекте: инструкция по работе с архетипами. PDF."
    ],
    placeholderNote: "Женский круг. Мужской путь",
    coverImageSrc: "/decks/zhenskiy-krug-muzhskoy-put/1.jpg",
    detailText: "43 карты с архетипами сказок (Василиса, Баба-яга, Иван-царевич и др.).",
    gallery: buildGallery("zhenskiy-krug-muzhskoy-put", 5),
    yandexDiskUrl: "https://disk.yandex.ru/d/example-zhenskiy-krug"
  },
  {
    id: "istochnik",
    title: "Источник. Путь к себе",
    subtitle: "Для поиска энергии и внутренней опоры",
    price: 190,
    format: "PDF + JPG",
    description: "42 карты, 8 разделов: архетипы, стихии, состояния, дары и финал — Источник.",
    highlights: [
      "Путешествие к целостности.",
      "В комплекте: руководство по прохождению пути. PDF."
    ],
    placeholderNote: "Источник. Путь к себе",
    coverImageSrc: "/decks/istochnik/1.jpg",
    detailText: "42 карты, 8 разделов: архетипы, стихии, состояния, дары и финал — Источник.",
    gallery: buildGallery("istochnik", 6),
    yandexDiskUrl: "https://disk.yandex.ru/d/example-istochnik"
  },
  {
    id: "magiya-vnutri",
    title: "Магия внутри",
    subtitle: "Для раскрытия внутреннего потенциала и уверенности",
    price: 190,
    format: "PDF + JPG",
    description: "36 карт-мантр для возвращения к себе.",
    highlights: [
      "6 разделов: я есть, выбираю, люблю, отпускаю, творю, верю.",
      "Короткие практики для ежедневной поддержки.",
      "В комплекте: инструкция. PDF."
    ],
    placeholderNote: "Магия внутри",
    coverImageSrc: "/decks/magiya-vnutri/1.jpg",
    detailText: "36 карт-мантр для возвращения к себе.",
    gallery: buildGallery("magiya-vnutri", 6),
    yandexDiskUrl: "https://disk.yandex.ru/d/example-magiya-vnutri"
  },
  {
    id: "mama",
    title: "Я и моя мама",
    subtitle: "Для тем материнства, заботы и личных границ",
    price: 190,
    format: "PDF + JPG",
    description: "45 карт для работы с отношениями с матерью, сепарацией и принятием.",
    highlights: [
      "Три раздела: что ношу → что хочу отдать → что забираю с любовью.",
      "В комплекте: методичка для специалистов. PDF."
    ],
    placeholderNote: "Я и моя мама",
    coverImageSrc: "/decks/mama/1.jpg",
    detailText: "45 карт для работы с отношениями с матерью, сепарацией и принятием.",
    gallery: buildGallery("mama", 6),
    yandexDiskUrl: "https://disk.yandex.ru/d/example-mama"
  }
];

export const featuredProductId = "ty-i-ya";

export const heroSlides: HeroSlide[] = [
  {
    id: "hero-slide-1",
    title: "Главный экран с реальным фото",
    caption: "Так выглядит верхняя часть сайта с вашей картинкой.",
    placeholderNote: "Ваше фото",
    imageSrc: "/images/hero-preview.png"
  },
  {
    id: "hero-slide-2",
    title: "Дополнительный ракурс",
    caption: "Можно показать другую колоду или красивую деталь",
    placeholderNote: "Слайд 02"
  },
  {
    id: "hero-slide-3",
    title: "Третий кадр",
    caption: "Подойдет атмосферное фото или стопка колод",
    placeholderNote: "Слайд 03"
  }
];

export function getProductById(productId: string) {
  return products.find((product) => product.id === productId);
}
