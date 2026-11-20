import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "acids-bases-and-salts",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$0.990\\text{ g}$$, $$0\\text{ g}$$, $$60.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$0.990\\text{ g}$$, $$0.495\\text{ g}$$, $$40.0\\text{ cm}^3$$",
        },
        {
          correct: true,
          label:
            "$$0.990\\text{ g}$$, $$0.495\\text{ g}$$, $$80.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$0.990\\text{ g}$$, $$0.743\\text{ g}$$, $$80.0\\text{ cm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$0.990\\text{ g}$$, $$0\\text{ g}$$, $$60.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$0.990\\text{ g}$$, $$0.495\\text{ g}$$, $$40.0\\text{ cm}^3$$",
        },
        {
          correct: true,
          label:
            "$$0.990\\text{ g}$$, $$0.495\\text{ g}$$, $$80.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$0.990\\text{ g}$$, $$0.743\\text{ g}$$, $$80.0\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;
