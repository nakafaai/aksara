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
          label:
            "$$480\\text{ cm}^3$$, $$6.0\\text{ cm}^3\\text{ s}^{-1}$$, $$0.50\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$240\\text{ cm}^3$$, $$3.0\\text{ cm}^3\\text{ s}^{-1}$$, $$0\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$240\\text{ cm}^3$$, $$6.0\\text{ cm}^3\\text{ s}^{-1}$$, $$0.50\\text{ g}$$",
        },
        {
          correct: true,
          label:
            "$$240\\text{ cm}^3$$, $$3.0\\text{ cm}^3\\text{ s}^{-1}$$, $$0.50\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$480\\text{ cm}^3$$, $$6.0\\text{ cm}^3\\text{ s}^{-1}$$, $$0.50\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$240\\text{ cm}^3$$, $$3.0\\text{ cm}^3\\text{ s}^{-1}$$, $$0\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$240\\text{ cm}^3$$, $$6.0\\text{ cm}^3\\text{ s}^{-1}$$, $$0.50\\text{ g}$$",
        },
        {
          correct: true,
          label:
            "$$240\\text{ cm}^3$$, $$3.0\\text{ cm}^3\\text{ s}^{-1}$$, $$0.50\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
