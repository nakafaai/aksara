import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  responses: {
    de: {
      categories: ["Richtig", "Falsch"],
      kind: "category",
      statements: [
        {
          correctCategoryOrder: 1,
          label:
            "Der Flächeninhalt einer $pl$-Seite wird mit $6$ multipliziert.",
        },
        {
          correctCategoryOrder: 1,
          label:
            "Der Flächeninhalt einer $lt$-Seite wird mit $\\frac32$ multipliziert.",
        },
        {
          correctCategoryOrder: 1,
          label: "Das Volumen wird mit $3$ multipliziert.",
        },
        {
          correctCategoryOrder: 2,
          label: "Jede Raumdiagonale wird mit $2$ multipliziert.",
        },
        {
          correctCategoryOrder: 2,
          label: "Die gesamte Oberfläche wird immer mit $3$ multipliziert.",
        },
      ],
    },
    en: {
      categories: ["True", "False"],
      kind: "category",
      statements: [
        {
          correctCategoryOrder: 1,
          label: "The area of a $pl$ face is multiplied by $6$.",
        },
        {
          correctCategoryOrder: 1,
          label: "The area of an $lt$ face is multiplied by $\\frac32$.",
        },
        {
          correctCategoryOrder: 1,
          label: "The volume is multiplied by $3$.",
        },
        {
          correctCategoryOrder: 2,
          label: "Every space diagonal is multiplied by $2$.",
        },
        {
          correctCategoryOrder: 2,
          label: "Total surface area is always multiplied by $3$.",
        },
      ],
    },
    id: {
      categories: ["Benar", "Salah"],
      kind: "category",
      statements: [
        {
          correctCategoryOrder: 1,
          label: "Luas sisi $pl$ dikalikan $6$.",
        },
        {
          correctCategoryOrder: 1,
          label: "Luas sisi $lt$ dikalikan $\\frac32$.",
        },
        {
          correctCategoryOrder: 1,
          label: "Volume dikalikan $3$.",
        },
        {
          correctCategoryOrder: 2,
          label: "Setiap diagonal ruang dikalikan $2$.",
        },
        {
          correctCategoryOrder: 2,
          label: "Luas permukaan total selalu dikalikan $3$.",
        },
      ],
    },
  },
};

export default item;
