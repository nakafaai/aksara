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
          label: "Die Wahrscheinlichkeit für Rot ist $\\frac{5}{9}$.",
        },
        {
          correctCategoryOrder: 1,
          label: "Die Wahrscheinlichkeit für Blau ist $\\frac{4}{9}$.",
        },
        {
          correctCategoryOrder: 1,
          label:
            "Bei einer Ziehung schließen sich die Ereignisse Rot und Blau gegenseitig aus.",
        },
        {
          correctCategoryOrder: 2,
          label: "Die Wahrscheinlichkeit für Rot oder Blau ist $\\frac12$.",
        },
      ],
    },
    en: {
      categories: ["True", "False"],
      kind: "category",
      statements: [
        {
          correctCategoryOrder: 1,
          label: "The probability of red is $\\frac{5}{9}$.",
        },
        {
          correctCategoryOrder: 1,
          label: "The probability of blue is $\\frac{4}{9}$.",
        },
        {
          correctCategoryOrder: 1,
          label: "On one draw, the red and blue events are mutually exclusive.",
        },
        {
          correctCategoryOrder: 2,
          label: "The probability of red or blue is $\\frac12$.",
        },
      ],
    },
    id: {
      categories: ["Benar", "Salah"],
      kind: "category",
      statements: [
        {
          correctCategoryOrder: 1,
          label: "Peluang mengambil bola merah adalah $\\frac{5}{9}$.",
        },
        {
          correctCategoryOrder: 1,
          label: "Peluang mengambil bola biru adalah $\\frac{4}{9}$.",
        },
        {
          correctCategoryOrder: 1,
          label:
            "Dalam satu pengambilan, kejadian merah dan biru saling lepas.",
        },
        {
          correctCategoryOrder: 2,
          label: "Peluang memperoleh bola merah atau biru adalah $\\frac12$.",
        },
      ],
    },
  },
};

export default item;
