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
          label: "$$6.0\\text{ cm}^3\\text{ s}^{-1}$$, $$0.74\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$12\\text{ cm}^3\\text{ s}^{-1}$$, $$0.57\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$6.0\\text{ cm}^3\\text{ s}^{-1}$$, $$0\\text{ g}$$",
        },
        {
          correct: true,
          label: "$$6.0\\text{ cm}^3\\text{ s}^{-1}$$, $$0.57\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$6.0\\text{ cm}^3\\text{ s}^{-1}$$, $$0.74\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$12\\text{ cm}^3\\text{ s}^{-1}$$, $$0.57\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$6.0\\text{ cm}^3\\text{ s}^{-1}$$, $$0\\text{ g}$$",
        },
        {
          correct: true,
          label: "$$6.0\\text{ cm}^3\\text{ s}^{-1}$$, $$0.57\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
