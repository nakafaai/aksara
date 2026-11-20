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
          label:
            "$$3.00\\text{ cm}^3\\text{ s}^{-1}$$, $$0.112\\text{ g}$$, $$192\\text{ cm}^3$$",
        },
        {
          correct: true,
          label:
            "$$3.00\\text{ cm}^3\\text{ s}^{-1}$$, $$0.112\\text{ g}$$, $$96.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$3.00\\text{ cm}^3\\text{ s}^{-1}$$, $$0\\text{ g}$$, $$96.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$1.60\\text{ cm}^3\\text{ s}^{-1}$$, $$0.112\\text{ g}$$, $$96.0\\text{ cm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$3.00\\text{ cm}^3\\text{ s}^{-1}$$, $$0.112\\text{ g}$$, $$192\\text{ cm}^3$$",
        },
        {
          correct: true,
          label:
            "$$3.00\\text{ cm}^3\\text{ s}^{-1}$$, $$0.112\\text{ g}$$, $$96.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$3.00\\text{ cm}^3\\text{ s}^{-1}$$, $$0\\text{ g}$$, $$96.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$1.60\\text{ cm}^3\\text{ s}^{-1}$$, $$0.112\\text{ g}$$, $$96.0\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;
