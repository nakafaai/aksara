import { unitNode } from "#corpus/curriculum/schema";

/** The KSSM Form 5 Biology chapters on inheritance, variation and genetic technology, Bab 11 to Bab 13. */
export const kssmForm5BiologyGeneticsNodes = [
  unitNode({
    key: "form-5-biology-inheritance",
    order: 110,
    translations: {
      de: { routeSlug: "vererbung", title: "Vererbung" },
      en: { routeSlug: "inheritance", title: "Inheritance" },
      id: { routeSlug: "pewarisan-sifat", title: "Pewarisan Sifat" },
      ms: { routeSlug: "pewarisan", title: "Pewarisan" },
    },
  }),
  unitNode({
    key: "form-5-biology-variation",
    order: 120,
    translations: {
      de: { routeSlug: "variation", title: "Variation" },
      en: { routeSlug: "variation", title: "Variation" },
      id: { routeSlug: "variasi", title: "Variasi" },
      ms: { routeSlug: "variasi", title: "Variasi" },
    },
  }),
  unitNode({
    key: "form-5-biology-genetic-technology",
    order: 130,
    translations: {
      de: { routeSlug: "gentechnik", title: "Gentechnik" },
      en: { routeSlug: "genetic-technology", title: "Genetic Technology" },
      id: { routeSlug: "teknologi-genetika", title: "Teknologi Genetika" },
      ms: { routeSlug: "teknologi-genetik", title: "Teknologi Genetik" },
    },
  }),
];
