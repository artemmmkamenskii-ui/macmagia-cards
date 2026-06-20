import { products } from "@/data/products";

export default function JsonLd() {
  const itemListElement = products.map((product, index) => ({
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: `https://macmagia.ru/cards${product.coverImageSrc ?? ""}`,
    url: `https://macmagia.ru/cards/products/${product.id}`,
    brand: { "@type": "Brand", name: "МакМагия" },
    category: "Метафорические ассоциативные карты (МАК)",
    offers: {
      "@type": "Offer",
      price: String(product.price),
      priceCurrency: "RUB",
      availability: "https://schema.org/InStock",
      url: `https://macmagia.ru/cards/products/${product.id}`,
      seller: { "@type": "Organization", name: "МакМагия" }
    },
    position: index + 1
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ItemList",
        "@id": "https://macmagia.ru/cards#catalog",
        name: "Каталог электронных колод метафорических ассоциативных карт",
        itemListElement
      },
      {
        "@type": "Organization",
        "@id": "https://macmagia.ru/cards#organization",
        name: "МакМагия",
        url: "https://macmagia.ru/cards",
        description:
          "Авторские электронные колоды метафорических ассоциативных карт (МАК) для психологов и личной практики.",
        founder: {
          "@type": "Person",
          name: "Каменская Екатерина Владимировна"
        }
      },
      {
        "@type": "WebPage",
        "@id": "https://macmagia.ru/cards#webpage",
        url: "https://macmagia.ru/cards",
        name: "Купить метафорические карты (МАК): электронные колоды — МакМагия",
        description:
          "Купить метафорические ассоциативные карты онлайн: авторские электронные колоды МАК для психологов и для себя, мгновенная доставка на email.",
        inLanguage: "ru-RU",
        isPartOf: { "@id": "https://macmagia.ru/cards#organization" }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
