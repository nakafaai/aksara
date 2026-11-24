import { additionalMathematicsStandards } from "#corpus/curriculum/kssm/documents";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** The KSSM Form 4 Additional Mathematics statistics chapter, index numbers. */
export const kssmForm4AdditionalMathematicsStatisticsNodes = [
  unitNode({
    children: [
      materialNode({
        key: "form-4-additional-mathematics-index-numbers-index-number",
        level: "lesson",
        materialKeys: ["lesson.mathematics.index-number"],
        order: 10,
        outcomes: [
          {
            code: "Form 4, Content Standards 10.1 to 10.2",
            ...additionalMathematicsStandards,
          },
        ],
      }),
    ],
    key: "form-4-additional-mathematics-index-numbers",
    materialCard: {
      de: {
        description: "Berechne Preisindizes und gewichtete Gesamtindizes.",
        title: "Indexzahlen",
      },
      en: {
        description: "Work out price indices and weighted composites.",
        title: "Index Numbers",
      },
      id: {
        description: "Hitung indeks harga dan indeks gabungan berbobot.",
        title: "Angka Indeks",
      },
      ms: {
        description: "Kira indeks harga dan indeks gubahan berpemberat.",
        title: "Nombor Indeks",
      },
    },
    order: 100,
    translations: {
      de: { routeSlug: "indexzahlen", title: "Indexzahlen" },
      en: { routeSlug: "index-numbers", title: "Index Numbers" },
      id: { routeSlug: "angka-indeks", title: "Angka Indeks" },
      ms: { routeSlug: "nombor-indeks", title: "Nombor Indeks" },
    },
  }),
];
