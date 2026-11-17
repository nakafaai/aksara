import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "waves",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$225\\text{ m}$$, $$3.0\\text{ cm}$$, and $$3.0\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$375\\text{ m}$$, $$3.0\\text{ cm}$$, and $$6.0\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$375\\text{ m}$$, $$30\\text{ m}$$, and $$3.0\\text{ m s}^{-1}$$",
        },
        {
          correct: true,
          label:
            "$$375\\text{ m}$$, $$3.0\\text{ cm}$$, and $$3.0\\text{ m s}^{-1}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$225\\text{ m}$$, $$3.0\\text{ cm}$$, and $$3.0\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$375\\text{ m}$$, $$3.0\\text{ cm}$$, and $$6.0\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$375\\text{ m}$$, $$30\\text{ m}$$, and $$3.0\\text{ m s}^{-1}$$",
        },
        {
          correct: true,
          label:
            "$$375\\text{ m}$$, $$3.0\\text{ cm}$$, and $$3.0\\text{ m s}^{-1}$$",
        },
      ],
    },
  },
};

export default item;
