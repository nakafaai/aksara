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
            "$$120\\text{ cm}^3$$, $$96.0\\text{ cm}^3$$, $$120\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$120\\text{ cm}^3$$, $$120\\text{ cm}^3$$, $$60\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$60\\text{ cm}^3$$, $$48.0\\text{ cm}^3$$, $$30\\text{ cm}^3$$",
        },
        {
          correct: true,
          label:
            "$$120\\text{ cm}^3$$, $$96.0\\text{ cm}^3$$, $$60\\text{ cm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$120\\text{ cm}^3$$, $$96.0\\text{ cm}^3$$, $$120\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$120\\text{ cm}^3$$, $$120\\text{ cm}^3$$, $$60\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$60\\text{ cm}^3$$, $$48.0\\text{ cm}^3$$, $$30\\text{ cm}^3$$",
        },
        {
          correct: true,
          label:
            "$$120\\text{ cm}^3$$, $$96.0\\text{ cm}^3$$, $$60\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;
