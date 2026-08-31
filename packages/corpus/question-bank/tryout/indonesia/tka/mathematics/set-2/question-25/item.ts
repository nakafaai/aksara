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
            "Die Wahrscheinlichkeit für eine ungerade Summe beträgt $\\frac47$.",
        },
        {
          correctCategoryOrder: 1,
          label:
            "Die Wahrscheinlichkeit für zwei Primzahlen beträgt $\\frac3{14}$.",
        },
        {
          correctCategoryOrder: 1,
          label:
            "Ist die erste Karte gerade, beträgt die Wahrscheinlichkeit für eine ungerade zweite Karte $\\frac47$.",
        },
        {
          correctCategoryOrder: 2,
          label:
            "Die Ereignisse erste Karte gerade und zweite Karte ungerade sind unabhängig.",
        },
        {
          correctCategoryOrder: 1,
          label:
            "Die Wahrscheinlichkeit, dass die größere Zahl $8$ ist, beträgt $\\frac14$.",
        },
      ],
    },
    en: {
      categories: ["True", "False"],
      kind: "category",
      statements: [
        {
          correctCategoryOrder: 1,
          label: "The probability of an odd sum is $\\frac47$.",
        },
        {
          correctCategoryOrder: 1,
          label: "The probability that both cards are prime is $\\frac3{14}$.",
        },
        {
          correctCategoryOrder: 1,
          label:
            "Given an even first card, the probability that the second card is odd is $\\frac47$.",
        },
        {
          correctCategoryOrder: 2,
          label:
            "The events first card even and second card odd are independent.",
        },
        {
          correctCategoryOrder: 1,
          label: "The probability that the larger number is $8$ is $\\frac14$.",
        },
      ],
    },
    id: {
      categories: ["Benar", "Salah"],
      kind: "category",
      statements: [
        {
          correctCategoryOrder: 1,
          label: "Peluang jumlah kedua angka ganjil adalah $\\frac47$.",
        },
        {
          correctCategoryOrder: 1,
          label: "Peluang kedua kartu bernomor prima adalah $\\frac3{14}$.",
        },
        {
          correctCategoryOrder: 1,
          label:
            "Jika kartu pertama genap, peluang kartu kedua ganjil adalah $\\frac47$.",
        },
        {
          correctCategoryOrder: 2,
          label:
            "Kejadian kartu pertama genap dan kartu kedua ganjil saling bebas.",
        },
        {
          correctCategoryOrder: 1,
          label:
            "Peluang angka yang lebih besar adalah $8$ sebesar $\\frac14$.",
        },
      ],
    },
  },
};

export default item;
