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
          correct: true,
          label:
            "$$50\\%$$, $$6.0\\text{ cm}^3\\text{ s}^{-1}$$, $$1.99\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$75\\%$$, $$6.0\\text{ cm}^3\\text{ s}^{-1}$$, $$1.99\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$50\\%$$, $$6.0\\text{ cm}^3\\text{ s}^{-1}$$, $$1.49\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$50\\%$$, $$12.0\\text{ cm}^3\\text{ s}^{-1}$$, $$1.99\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$50\\%$$, $$6.0\\text{ cm}^3\\text{ s}^{-1}$$, $$1.99\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$75\\%$$, $$6.0\\text{ cm}^3\\text{ s}^{-1}$$, $$1.99\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$50\\%$$, $$6.0\\text{ cm}^3\\text{ s}^{-1}$$, $$1.49\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$50\\%$$, $$12.0\\text{ cm}^3\\text{ s}^{-1}$$, $$1.99\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
