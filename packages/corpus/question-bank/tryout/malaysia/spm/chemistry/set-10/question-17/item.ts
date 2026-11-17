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
            "$$720\\text{ cm}^3$$, $$1.99\\text{ g}$$, $$6.0\\text{ cm}^3\\text{ s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$480\\text{ cm}^3$$, $$2.31\\text{ g}$$, $$6.0\\text{ cm}^3\\text{ s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$720\\text{ cm}^3$$, $$1.49\\text{ g}$$, $$6.0\\text{ cm}^3\\text{ s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$720\\text{ cm}^3$$, $$1.99\\text{ g}$$, $$12.0\\text{ cm}^3\\text{ s}^{-1}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$720\\text{ cm}^3$$, $$1.99\\text{ g}$$, $$6.0\\text{ cm}^3\\text{ s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$480\\text{ cm}^3$$, $$2.31\\text{ g}$$, $$6.0\\text{ cm}^3\\text{ s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$720\\text{ cm}^3$$, $$1.49\\text{ g}$$, $$6.0\\text{ cm}^3\\text{ s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$720\\text{ cm}^3$$, $$1.99\\text{ g}$$, $$12.0\\text{ cm}^3\\text{ s}^{-1}$$",
        },
      ],
    },
  },
};

export default item;
