import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "rate-of-reaction",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$5.64\\text{ cm}^3\\text{ s}^{-1}$$, $$0\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$5.64\\text{ cm}^3\\text{ s}^{-1}$$, $$1.59\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$4.00\\text{ cm}^3\\text{ s}^{-1}$$, $$0.53\\text{ g}$$",
        },
        {
          correct: true,
          label: "$$5.64\\text{ cm}^3\\text{ s}^{-1}$$, $$0.53\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$5.64\\text{ cm}^3\\text{ s}^{-1}$$, $$0\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$5.64\\text{ cm}^3\\text{ s}^{-1}$$, $$1.59\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$4.00\\text{ cm}^3\\text{ s}^{-1}$$, $$0.53\\text{ g}$$",
        },
        {
          correct: true,
          label: "$$5.64\\text{ cm}^3\\text{ s}^{-1}$$, $$0.53\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
