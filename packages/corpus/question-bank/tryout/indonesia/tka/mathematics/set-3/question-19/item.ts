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
          label: "Der Umfang der Grundfläche wird mit $3$ multipliziert.",
        },
        {
          correctCategoryOrder: 1,
          label:
            "Der Flächeninhalt der Grundfläche wird mit $9$ multipliziert.",
        },
        {
          correctCategoryOrder: 1,
          label: "Das Volumen wird mit $\\frac92$ multipliziert.",
        },
        {
          correctCategoryOrder: 2,
          label: "Die Mantellinie wird immer mit $\\frac32$ multipliziert.",
        },
        {
          correctCategoryOrder: 2,
          label: "Die Mantelfläche wird immer mit $\\frac92$ multipliziert.",
        },
      ],
    },
    en: {
      categories: ["True", "False"],
      kind: "category",
      statements: [
        {
          correctCategoryOrder: 1,
          label: "The base circumference is multiplied by $3$.",
        },
        {
          correctCategoryOrder: 1,
          label: "The base area is multiplied by $9$.",
        },
        {
          correctCategoryOrder: 1,
          label: "The volume is multiplied by $\\frac92$.",
        },
        {
          correctCategoryOrder: 2,
          label: "The slant height is always multiplied by $\\frac32$.",
        },
        {
          correctCategoryOrder: 2,
          label: "The lateral area is always multiplied by $\\frac92$.",
        },
      ],
    },
    id: {
      categories: ["Benar", "Salah"],
      kind: "category",
      statements: [
        {
          correctCategoryOrder: 1,
          label: "Keliling alas dikalikan $3$.",
        },
        {
          correctCategoryOrder: 1,
          label: "Luas alas dikalikan $9$.",
        },
        {
          correctCategoryOrder: 1,
          label: "Volume dikalikan $\\frac92$.",
        },
        {
          correctCategoryOrder: 2,
          label: "Garis pelukis selalu dikalikan $\\frac32$.",
        },
        {
          correctCategoryOrder: 2,
          label: "Luas selimut selalu dikalikan $\\frac92$.",
        },
      ],
    },
  },
};

export default item;
