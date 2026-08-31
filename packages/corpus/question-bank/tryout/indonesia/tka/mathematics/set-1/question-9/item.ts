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
          label: "$u_4=54$",
        },
        {
          correctCategoryOrder: 1,
          label: "$S_4=80$",
        },
        {
          correctCategoryOrder: 2,
          label: "$u_6=243$",
        },
        {
          correctCategoryOrder: 1,
          label: "$\\frac{u_6}{u_3}=27$",
        },
      ],
    },
    en: {
      categories: ["True", "False"],
      kind: "category",
      statements: [
        {
          correctCategoryOrder: 1,
          label: "$u_4=54$",
        },
        {
          correctCategoryOrder: 1,
          label: "$S_4=80$",
        },
        {
          correctCategoryOrder: 2,
          label: "$u_6=243$",
        },
        {
          correctCategoryOrder: 1,
          label: "$\\frac{u_6}{u_3}=27$",
        },
      ],
    },
    id: {
      categories: ["Benar", "Salah"],
      kind: "category",
      statements: [
        {
          correctCategoryOrder: 1,
          label: "$u_4=54$",
        },
        {
          correctCategoryOrder: 1,
          label: "$S_4=80$",
        },
        {
          correctCategoryOrder: 2,
          label: "$u_6=243$",
        },
        {
          correctCategoryOrder: 1,
          label: "$\\frac{u_6}{u_3}=27$",
        },
      ],
    },
  },
};

export default item;
