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
          label: "$$0\\text{ g}$$, $$80\\text{ cm}^3\\text{ min}^{-1}$$",
        },
        {
          correct: false,
          label: "$$0.50\\text{ g}$$, $$40\\text{ cm}^3\\text{ min}^{-1}$$",
        },
        {
          correct: false,
          label: "$$0.67\\text{ g}$$, $$80\\text{ cm}^3\\text{ min}^{-1}$$",
        },
        {
          correct: true,
          label: "$$0.50\\text{ g}$$, $$80\\text{ cm}^3\\text{ min}^{-1}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$0\\text{ g}$$, $$80\\text{ cm}^3\\text{ min}^{-1}$$",
        },
        {
          correct: false,
          label: "$$0.50\\text{ g}$$, $$40\\text{ cm}^3\\text{ min}^{-1}$$",
        },
        {
          correct: false,
          label: "$$0.67\\text{ g}$$, $$80\\text{ cm}^3\\text{ min}^{-1}$$",
        },
        {
          correct: true,
          label: "$$0.50\\text{ g}$$, $$80\\text{ cm}^3\\text{ min}^{-1}$$",
        },
      ],
    },
  },
};

export default item;
