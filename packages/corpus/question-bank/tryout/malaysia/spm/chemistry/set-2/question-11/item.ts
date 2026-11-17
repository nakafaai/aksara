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
            "$$240\\text{ cm}^3$$, $$8.00\\text{ cm}^3\\text{ s}^{-1}$$, $$50.0\\text{ cm}^3$$",
        },
        {
          correct: true,
          label:
            "$$120\\text{ cm}^3$$, $$8.00\\text{ cm}^3\\text{ s}^{-1}$$, $$50.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$120\\text{ cm}^3$$, $$4.00\\text{ cm}^3\\text{ s}^{-1}$$, $$50.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$120\\text{ cm}^3$$, $$8.00\\text{ cm}^3\\text{ s}^{-1}$$, $$75.0\\text{ cm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$240\\text{ cm}^3$$, $$8.00\\text{ cm}^3\\text{ s}^{-1}$$, $$50.0\\text{ cm}^3$$",
        },
        {
          correct: true,
          label:
            "$$120\\text{ cm}^3$$, $$8.00\\text{ cm}^3\\text{ s}^{-1}$$, $$50.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$120\\text{ cm}^3$$, $$4.00\\text{ cm}^3\\text{ s}^{-1}$$, $$50.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$120\\text{ cm}^3$$, $$8.00\\text{ cm}^3\\text{ s}^{-1}$$, $$75.0\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;
