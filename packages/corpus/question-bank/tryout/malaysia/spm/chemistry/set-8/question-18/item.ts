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
            "$$0\\text{ g}$$, $$80\\text{ cm}^3\\text{ min}^{-1}$$, $$240\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$0.50\\text{ g}$$, $$80\\text{ cm}^3\\text{ min}^{-1}$$, $$120\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$0.50\\text{ g}$$, $$80\\text{ cm}^3\\text{ min}^{-1}$$, $$480\\text{ cm}^3$$",
        },
        {
          correct: true,
          label:
            "$$0.50\\text{ g}$$, $$80\\text{ cm}^3\\text{ min}^{-1}$$, $$240\\text{ cm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$0\\text{ g}$$, $$80\\text{ cm}^3\\text{ min}^{-1}$$, $$240\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$0.50\\text{ g}$$, $$80\\text{ cm}^3\\text{ min}^{-1}$$, $$120\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$0.50\\text{ g}$$, $$80\\text{ cm}^3\\text{ min}^{-1}$$, $$480\\text{ cm}^3$$",
        },
        {
          correct: true,
          label:
            "$$0.50\\text{ g}$$, $$80\\text{ cm}^3\\text{ min}^{-1}$$, $$240\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;
