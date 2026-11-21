import { biologyStandards } from "#corpus/curriculum/kssm/documents";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

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
    children: [
      materialNode({
        key: "form-5-biology-genetic-technology-genetic-technology",
        level: "lesson",
        materialKeys: ["lesson.biology.genetic-technology"],
        order: 10,
        outcomes: [
          {
            code: "Form 5, Content Standards 28.1 to 28.2",
            ...biologyStandards,
          },
        ],
      }),
    ],
    key: "form-5-biology-genetic-technology",
    materialCard: {
      de: {
        description: "Stell Insulin mit Bakterien her und lies DNA-Profile.",
        title: "Gentechnik",
      },
      en: {
        description: "Make insulin with bacteria and read DNA profiles.",
        title: "Genetic Technology",
      },
      id: {
        description: "Buat insulin dengan bakteri dan baca profil DNA.",
        title: "Teknologi Genetika",
      },
      ms: {
        description: "Hasilkan insulin dengan bakteria dan baca profil DNA.",
        title: "Teknologi Genetik",
      },
    },
    order: 130,
    translations: {
      de: { routeSlug: "gentechnik", title: "Gentechnik" },
      en: { routeSlug: "genetic-technology", title: "Genetic Technology" },
      id: { routeSlug: "teknologi-genetika", title: "Teknologi Genetika" },
      ms: { routeSlug: "teknologi-genetik", title: "Teknologi Genetik" },
    },
  }),
];
