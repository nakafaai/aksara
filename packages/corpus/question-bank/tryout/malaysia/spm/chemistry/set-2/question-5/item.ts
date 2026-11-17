import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "mole-concept",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$40\\text{ cm}^3$$, $$30\\text{ cm}^3$$, $$0.0400\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$60\\text{ cm}^3$$, $$60\\text{ cm}^3$$, $$0\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$40\\text{ cm}^3$$, $$40\\text{ cm}^3$$, $$0.0400\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$40\\text{ cm}^3$$, $$30\\text{ cm}^3$$, $$0.0267\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$40\\text{ cm}^3$$, $$30\\text{ cm}^3$$, $$0.0400\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$60\\text{ cm}^3$$, $$60\\text{ cm}^3$$, $$0\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$40\\text{ cm}^3$$, $$40\\text{ cm}^3$$, $$0.0400\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$40\\text{ cm}^3$$, $$30\\text{ cm}^3$$, $$0.0267\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
