import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "carbon-compounds",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$40\\text{ cm}^3$$, $$0.313\\text{ g}$$, $$140\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$60\\text{ cm}^3$$, $$0.470\\text{ g}$$, $$160\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$40\\text{ cm}^3$$, $$0.313\\text{ g}$$, $$260\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$40\\text{ cm}^3$$, $$0.267\\text{ g}$$, $$140\\text{ cm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$40\\text{ cm}^3$$, $$0.313\\text{ g}$$, $$140\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$60\\text{ cm}^3$$, $$0.470\\text{ g}$$, $$160\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$40\\text{ cm}^3$$, $$0.313\\text{ g}$$, $$260\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$40\\text{ cm}^3$$, $$0.267\\text{ g}$$, $$140\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;
