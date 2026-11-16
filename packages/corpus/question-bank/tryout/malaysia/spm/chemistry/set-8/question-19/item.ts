import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "rate-of-reaction",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$1.08\\text{ cm}^3\\text{ s}^{-1}$$, $$0.088\\text{ g}$$",
        },
        {
          correct: true,
          label: "$$0.83\\text{ cm}^3\\text{ s}^{-1}$$, $$0.088\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$0.83\\text{ cm}^3\\text{ s}^{-1}$$, $$0.176\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$0.59\\text{ cm}^3\\text{ s}^{-1}$$, $$0.088\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$1.08\\text{ cm}^3\\text{ s}^{-1}$$, $$0.088\\text{ g}$$",
        },
        {
          correct: true,
          label: "$$0.83\\text{ cm}^3\\text{ s}^{-1}$$, $$0.088\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$0.83\\text{ cm}^3\\text{ s}^{-1}$$, $$0.176\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$0.59\\text{ cm}^3\\text{ s}^{-1}$$, $$0.088\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
