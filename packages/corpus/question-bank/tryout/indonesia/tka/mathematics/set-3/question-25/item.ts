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
          label: "Die Wahrscheinlichkeit für die Summe $9$ beträgt $\\frac19$.",
        },
        {
          correctCategoryOrder: 1,
          label:
            "Die Wahrscheinlichkeit, dass der rote Würfel größer ist, beträgt $\\frac5{12}$.",
        },
        {
          correctCategoryOrder: 1,
          label:
            "Unter der Bedingung einer geraden Summe beträgt die Wahrscheinlichkeit für zwei ungerade Augenzahlen $\\frac12$.",
        },
        {
          correctCategoryOrder: 1,
          label:
            "Die Ereignisse roter Würfel gerade und Summe gerade sind unabhängig.",
        },
        {
          correctCategoryOrder: 2,
          label:
            "Die Wahrscheinlichkeit für mindestens eine Sechs beträgt $\\frac13$.",
        },
      ],
    },
    en: {
      categories: ["True", "False"],
      kind: "category",
      statements: [
        {
          correctCategoryOrder: 1,
          label: "The probability of a sum of $9$ is $\\frac19$.",
        },
        {
          correctCategoryOrder: 1,
          label: "The probability that the red die is larger is $\\frac5{12}$.",
        },
        {
          correctCategoryOrder: 1,
          label:
            "Given an even sum, the probability that both dice are odd is $\\frac12$.",
        },
        {
          correctCategoryOrder: 1,
          label: "The events red die even and sum even are independent.",
        },
        {
          correctCategoryOrder: 2,
          label: "The probability of at least one six is $\\frac13$.",
        },
      ],
    },
    id: {
      categories: ["Benar", "Salah"],
      kind: "category",
      statements: [
        {
          correctCategoryOrder: 1,
          label: "Peluang jumlah kedua dadu $9$ adalah $\\frac19$.",
        },
        {
          correctCategoryOrder: 1,
          label: "Peluang dadu merah lebih besar adalah $\\frac5{12}$.",
        },
        {
          correctCategoryOrder: 1,
          label:
            "Jika jumlahnya genap, peluang kedua dadu menunjukkan angka ganjil adalah $\\frac12$.",
        },
        {
          correctCategoryOrder: 1,
          label:
            "Kejadian dadu merah genap dan jumlah kedua dadu genap saling bebas.",
        },
        {
          correctCategoryOrder: 2,
          label:
            "Peluang sedikitnya satu dadu menunjukkan angka enam adalah $\\frac13$.",
        },
      ],
    },
  },
};

export default item;
