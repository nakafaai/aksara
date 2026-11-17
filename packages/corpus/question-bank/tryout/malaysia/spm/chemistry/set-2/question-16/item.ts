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
            "$$83.3\\%$$, $$4.00\\text{ cm}^3\\text{ s}^{-1}$$, $$60.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$83.3\\%$$, $$0.250\\text{ cm}^3\\text{ s}^{-1}$$, $$40.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$16.7\\%$$, $$4.00\\text{ cm}^3\\text{ s}^{-1}$$, $$40.0\\text{ cm}^3$$",
        },
        {
          correct: true,
          label:
            "$$83.3\\%$$, $$4.00\\text{ cm}^3\\text{ s}^{-1}$$, $$40.0\\text{ cm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$83.3\\%$$, $$4.00\\text{ cm}^3\\text{ s}^{-1}$$, $$60.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$83.3\\%$$, $$0.250\\text{ cm}^3\\text{ s}^{-1}$$, $$40.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$16.7\\%$$, $$4.00\\text{ cm}^3\\text{ s}^{-1}$$, $$40.0\\text{ cm}^3$$",
        },
        {
          correct: true,
          label:
            "$$83.3\\%$$, $$4.00\\text{ cm}^3\\text{ s}^{-1}$$, $$40.0\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;
