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
          label: "$$240\\text{ cm}^3$$, $$120\\text{ cm}^3$$, $$15\\text{ s}$$",
        },
        {
          correct: true,
          label: "$$120\\text{ cm}^3$$, $$120\\text{ cm}^3$$, $$15\\text{ s}$$",
        },
        {
          correct: false,
          label: "$$120\\text{ cm}^3$$, $$240\\text{ cm}^3$$, $$15\\text{ s}$$",
        },
        {
          correct: false,
          label: "$$120\\text{ cm}^3$$, $$120\\text{ cm}^3$$, $$30\\text{ s}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$240\\text{ cm}^3$$, $$120\\text{ cm}^3$$, $$15\\text{ s}$$",
        },
        {
          correct: true,
          label: "$$120\\text{ cm}^3$$, $$120\\text{ cm}^3$$, $$15\\text{ s}$$",
        },
        {
          correct: false,
          label: "$$120\\text{ cm}^3$$, $$240\\text{ cm}^3$$, $$15\\text{ s}$$",
        },
        {
          correct: false,
          label: "$$120\\text{ cm}^3$$, $$120\\text{ cm}^3$$, $$30\\text{ s}$$",
        },
      ],
    },
  },
};

export default item;
