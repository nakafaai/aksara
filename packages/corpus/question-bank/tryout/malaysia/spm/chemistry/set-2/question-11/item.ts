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
            "$$240\\text{ cm}^3$$, $$120\\text{ cm}^3$$, $$4.0\\text{ cm}^3\\text{ s}^{-1}$$",
        },
        {
          correct: true,
          label:
            "$$120\\text{ cm}^3$$, $$120\\text{ cm}^3$$, $$4.0\\text{ cm}^3\\text{ s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$120\\text{ cm}^3$$, $$240\\text{ cm}^3$$, $$8.0\\text{ cm}^3\\text{ s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$120\\text{ cm}^3$$, $$120\\text{ cm}^3$$, $$2.0\\text{ cm}^3\\text{ s}^{-1}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$240\\text{ cm}^3$$, $$120\\text{ cm}^3$$, $$4.0\\text{ cm}^3\\text{ s}^{-1}$$",
        },
        {
          correct: true,
          label:
            "$$120\\text{ cm}^3$$, $$120\\text{ cm}^3$$, $$4.0\\text{ cm}^3\\text{ s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$120\\text{ cm}^3$$, $$240\\text{ cm}^3$$, $$8.0\\text{ cm}^3\\text{ s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$120\\text{ cm}^3$$, $$120\\text{ cm}^3$$, $$2.0\\text{ cm}^3\\text{ s}^{-1}$$",
        },
      ],
    },
  },
};

export default item;
