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
            "$$480\\text{ cm}^3$$, $$6.0\\text{ cm}^3\\text{ s}^{-1}$$, $$600\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$600\\text{ cm}^3$$, $$5.0\\text{ cm}^3\\text{ s}^{-1}$$, $$600\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$480\\text{ cm}^3$$, $$6.0\\text{ cm}^3\\text{ s}^{-1}$$, $$960\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$480\\text{ cm}^3$$, $$6.0\\text{ cm}^3\\text{ s}^{-1}$$, $$480\\text{ cm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$480\\text{ cm}^3$$, $$6.0\\text{ cm}^3\\text{ s}^{-1}$$, $$600\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$600\\text{ cm}^3$$, $$5.0\\text{ cm}^3\\text{ s}^{-1}$$, $$600\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$480\\text{ cm}^3$$, $$6.0\\text{ cm}^3\\text{ s}^{-1}$$, $$960\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$480\\text{ cm}^3$$, $$6.0\\text{ cm}^3\\text{ s}^{-1}$$, $$480\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;
