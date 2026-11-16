import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "carbon-compounds",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$0.36\\text{ g}$$, and only the product of propan-1-ol",
        },
        {
          correct: true,
          label: "$$0.54\\text{ g}$$, and only the product of propan-1-ol",
        },
        {
          correct: false,
          label: "$$0.54\\text{ g}$$, and the products of both alcohols",
        },
        {
          correct: false,
          label: "$$0.90\\text{ g}$$, and only the product of propan-1-ol",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$0.36\\text{ g}$$, dan hasil propan-1-ol sahaja",
        },
        {
          correct: true,
          label: "$$0.54\\text{ g}$$, dan hasil propan-1-ol sahaja",
        },
        {
          correct: false,
          label: "$$0.54\\text{ g}$$, dan hasil kedua-dua alkohol",
        },
        {
          correct: false,
          label: "$$0.90\\text{ g}$$, dan hasil propan-1-ol sahaja",
        },
      ],
    },
  },
};

export default item;
