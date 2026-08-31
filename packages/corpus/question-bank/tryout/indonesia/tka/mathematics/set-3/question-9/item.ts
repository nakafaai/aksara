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
          label: "$u_3=18$",
        },
        {
          correctCategoryOrder: 1,
          label: "$u_4=-54$",
        },
        {
          correctCategoryOrder: 1,
          label: "$S_5=122$",
        },
        {
          correctCategoryOrder: 2,
          label: "$u_6=486$",
        },
      ],
    },
    en: {
      categories: ["True", "False"],
      kind: "category",
      statements: [
        {
          correctCategoryOrder: 1,
          label: "$u_3=18$",
        },
        {
          correctCategoryOrder: 1,
          label: "$u_4=-54$",
        },
        {
          correctCategoryOrder: 1,
          label: "$S_5=122$",
        },
        {
          correctCategoryOrder: 2,
          label: "$u_6=486$",
        },
      ],
    },
    id: {
      categories: ["Benar", "Salah"],
      kind: "category",
      statements: [
        {
          correctCategoryOrder: 1,
          label: "$u_3=18$",
        },
        {
          correctCategoryOrder: 1,
          label: "$u_4=-54$",
        },
        {
          correctCategoryOrder: 1,
          label: "$S_5=122$",
        },
        {
          correctCategoryOrder: 2,
          label: "$u_6=486$",
        },
      ],
    },
  },
};

export default item;
