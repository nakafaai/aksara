import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "data-probability",
    topic: "probability",
  },
  responses: {
    de: {
      categories: ["Richtig", "Falsch"],
      kind: "category",
      statements: [
        {
          correctCategoryOrder: 1,
          label:
            "Die Wahrscheinlichkeit für zwei gleichfarbige Kugeln beträgt $\\frac{5}{18}$.",
        },
        {
          correctCategoryOrder: 1,
          label:
            "Die Wahrscheinlichkeit für genau eine rote Kugel beträgt $\\frac{5}{9}$.",
        },
        {
          correctCategoryOrder: 2,
          label: "Die Farben der ersten und zweiten Ziehung sind unabhängig.",
        },
        {
          correctCategoryOrder: 1,
          label:
            "Ist die erste Kugel grün, beträgt die Wahrscheinlichkeit für eine blaue zweite Kugel $\\frac{3}{8}$.",
        },
      ],
    },
    en: {
      categories: ["True", "False"],
      kind: "category",
      statements: [
        {
          correctCategoryOrder: 1,
          label:
            "The probability that both balls have the same colour is $\\frac{5}{18}$.",
        },
        {
          correctCategoryOrder: 1,
          label: "The probability of exactly one red ball is $\\frac{5}{9}$.",
        },
        {
          correctCategoryOrder: 2,
          label: "The colours on the first and second draws are independent.",
        },
        {
          correctCategoryOrder: 1,
          label:
            "Given that the first ball is green, the probability that the second is blue is $\\frac{3}{8}$.",
        },
      ],
    },
    id: {
      categories: ["Benar", "Salah"],
      kind: "category",
      statements: [
        {
          correctCategoryOrder: 1,
          label: "Peluang kedua bola berwarna sama adalah $\\frac{5}{18}$.",
        },
        {
          correctCategoryOrder: 1,
          label: "Peluang tepat satu bola merah adalah $\\frac{5}{9}$.",
        },
        {
          correctCategoryOrder: 2,
          label: "Warna bola pada pengambilan pertama dan kedua saling bebas.",
        },
        {
          correctCategoryOrder: 1,
          label:
            "Jika bola pertama hijau, peluang bola kedua biru adalah $\\frac{3}{8}$.",
        },
      ],
    },
  },
};

export default item;
