import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "acids-bases-and-salts",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$100\\text{ cm}^3$$, $$5.00\\text{ cm}^3$$, $$9.00\\text{ cm}^3$$",
        },
        {
          correct: true,
          label:
            "$$90.0\\text{ cm}^3$$, $$5.00\\text{ cm}^3$$, $$9.00\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$90.0\\text{ cm}^3$$, $$50.0\\text{ cm}^3$$, $$90.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$90.0\\text{ cm}^3$$, $$5.00\\text{ cm}^3$$, $$18.0\\text{ cm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$100\\text{ cm}^3$$, $$5.00\\text{ cm}^3$$, $$9.00\\text{ cm}^3$$",
        },
        {
          correct: true,
          label:
            "$$90.0\\text{ cm}^3$$, $$5.00\\text{ cm}^3$$, $$9.00\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$90.0\\text{ cm}^3$$, $$50.0\\text{ cm}^3$$, $$90.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$90.0\\text{ cm}^3$$, $$5.00\\text{ cm}^3$$, $$18.0\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;
