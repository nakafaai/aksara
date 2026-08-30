import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "algebra",
    topic: "sequences-series",
  },
  responses: {
    de: {
      categories: ["Richtig", "Falsch"],
      kind: "category",
      statements: [
        {
          correctCategoryOrder: 1,
          label: "Das dritte Glied ist $12$.",
        },
        {
          correctCategoryOrder: 1,
          label: "Die Summe der ersten drei Glieder ist $21$.",
        },
        {
          correctCategoryOrder: 2,
          label: "Das fünfte Glied ist $24$.",
        },
        {
          correctCategoryOrder: 1,
          label: "Für jedes $n\\geq1$ gilt $\\frac{u_{n+1}}{u_n}=2$.",
        },
      ],
    },
    en: {
      categories: ["True", "False"],
      kind: "category",
      statements: [
        {
          correctCategoryOrder: 1,
          label: "The third term is $12$.",
        },
        {
          correctCategoryOrder: 1,
          label: "The sum of the first three terms is $21$.",
        },
        {
          correctCategoryOrder: 2,
          label: "The fifth term is $24$.",
        },
        {
          correctCategoryOrder: 1,
          label: "For every $n\\geq1$, $\\frac{u_{n+1}}{u_n}=2$.",
        },
      ],
    },
    id: {
      categories: ["Benar", "Salah"],
      kind: "category",
      statements: [
        {
          correctCategoryOrder: 1,
          label: "Suku ketiga adalah $12$.",
        },
        {
          correctCategoryOrder: 1,
          label: "Jumlah tiga suku pertama adalah $21$.",
        },
        {
          correctCategoryOrder: 2,
          label: "Suku kelima adalah $24$.",
        },
        {
          correctCategoryOrder: 1,
          label: "Untuk setiap $n\\geq1$, berlaku $\\frac{u_{n+1}}{u_n}=2$.",
        },
      ],
    },
  },
};

export default item;
