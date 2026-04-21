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
  return Array.from({ length: count }, (_, index) => `/decks/${folder}/${index + 1}.png`);
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
    title: "К себе",
    subtitle: "Колода для возвращения к себе и внутренней опоре",
    price: 190,
    format: "PDF + JPG",
    description: "Электронная колода для личной практики и бережной самоподдержки.",
    highlights: [
      "50 карточек с образами и вопросами",
      "Подходит для самостоятельной практики",
      "Удобно использовать онлайн"
    ],
    placeholderNote: "К себе",
    coverImageSrc: "/decks/k-sebe/1.png",
    detailText: "Мягкая колода для практик, где важно вернуть чувство опоры, спокойствия и контакта с собой.",
    gallery: buildGallery("k-sebe", 6),
    yandexDiskUrl: "https://disk.yandex.ru/d/example-k-sebe"
  },
  {
    id: "ty-i-ya",
    title: "Ты и я",
    subtitle: "Для тем отношений, границ и честного диалога",
    price: 190,
    format: "PDF + JPG",
    description: "Колода для личной и парной работы, когда важно увидеть отношения глубже.",
    highlights: [
      "Подходит для психологов и коучей",
      "Можно использовать в онлайн-сессиях",
      "Мгновенный доступ после оплаты"
    ],
    placeholderNote: "Ты и я",
    coverImageSrc: "/decks/ty-i-ya/1.png",
    detailText: "Колода про отношения, близость и границы с акцентом на бережный разговор.",
    gallery: buildGallery("ty-i-ya", 6),
    yandexDiskUrl: "https://disk.yandex.ru/d/example-ty-i-ya"
  },
  {
    id: "moe-telo",
    title: "Мое тело",
    subtitle: "Для примирения с телом и заботы о себе",
    price: 190,
    format: "PDF + JPG",
    description: "Колода с практиками и образами для принятия себя и контакта с телом.",
    highlights: [
      "Подходит для самостоятельной работы",
      "Помогает снизить внутреннюю критику",
      "Удобно использовать онлайн"
    ],
    placeholderNote: "Мое тело",
    coverImageSrc: "/decks/moe-telo/1.png",
    detailText: "Колода для восстановления контакта с телом, самопринятия и мягкой заботы о себе.",
    gallery: buildGallery("moe-telo", 5),
    yandexDiskUrl: "https://disk.yandex.ru/d/example-moe-telo"
  },
  {
    id: "dyshi",
    title: "Дыши",
    subtitle: "Для работы с тревогой и возвращения в спокойствие",
    price: 190,
    format: "PDF + JPG",
    description: "Колода для заземления, дыхательных практик и мягкого восстановления ресурса.",
    highlights: ["Быстрые практики самопомощи", "Подходит для онлайн-работы", "Удобно для ежедневных ритуалов"],
    placeholderNote: "Дыши",
    coverImageSrc: "/decks/dyshi/1.png",
    detailText: "Колода помогает снизить тревожность, стабилизировать состояние и бережно вернуться к себе.",
    gallery: buildGallery("dyshi", 7),
    yandexDiskUrl: "https://disk.yandex.ru/d/example-dyshi"
  },
  {
    id: "zhenskiy-krug-muzhskoy-put",
    title: "Женский круг - мужской путь",
    subtitle: "Для исследования женско-мужской динамики в отношениях",
    price: 190,
    format: "PDF + JPG",
    description: "Колода для консультаций и личной рефлексии по теме баланса мужского и женского.",
    highlights: ["Вопросы для парной работы", "Подходит для терапевтических сессий", "Формат для онлайн и офлайн"],
    placeholderNote: "Женский круг - мужской путь",
    coverImageSrc: "/decks/zhenskiy-krug-muzhskoy-put/1.png",
    detailText: "Колода помогает увидеть роли, ожидания и точки роста в отношениях.",
    gallery: buildGallery("zhenskiy-krug-muzhskoy-put", 5),
    yandexDiskUrl: "https://disk.yandex.ru/d/example-zhenskiy-krug"
  },
  {
    id: "istochnik",
    title: "Источник",
    subtitle: "Для поиска энергии и внутренней опоры",
    price: 190,
    format: "PDF + JPG",
    description: "Колода для возвращения к своим ценностям, желаниям и ресурсному состоянию.",
    highlights: ["Мягкий формат вопросов", "Подходит для клиентов и личной работы", "Можно использовать в чатах"],
    placeholderNote: "Источник",
    coverImageSrc: "/decks/istochnik/1.png",
    detailText: "Колода про внутренний источник силы, опоры и ясности в сложных периодах.",
    gallery: buildGallery("istochnik", 6),
    yandexDiskUrl: "https://disk.yandex.ru/d/example-istochnik"
  },
  {
    id: "magiya-vnutri",
    title: "Магия внутри",
    subtitle: "Для раскрытия внутреннего потенциала и уверенности",
    price: 190,
    format: "PDF + JPG",
    description: "Колода с поддерживающими образами для личного роста и вдохновения.",
    highlights: ["Подходит для ежедневной практики", "Работает в формате мини-сессий", "Красивые иллюстрации для онлайн"],
    placeholderNote: "Магия внутри",
    coverImageSrc: "/decks/magiya-vnutri/1.png",
    detailText: "Колода помогает мягко раскрывать потенциал, усиливать веру в себя и двигаться вперед.",
    gallery: buildGallery("magiya-vnutri", 6),
    yandexDiskUrl: "https://disk.yandex.ru/d/example-magiya-vnutri"
  },
  {
    id: "mama",
    title: "Мама",
    subtitle: "Для тем материнства, заботы и личных границ",
    price: 190,
    format: "PDF + JPG",
    description: "Колода для бережной работы с материнскими ролями, усталостью и самоподдержкой.",
    highlights: ["Подходит для помогающих практиков", "Можно применять самостоятельно", "Формат коротких ежедневных практик"],
    placeholderNote: "Мама",
    coverImageSrc: "/decks/mama/1.png",
    detailText: "Колода для тем материнства, ресурса и личных границ без чувства вины.",
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
