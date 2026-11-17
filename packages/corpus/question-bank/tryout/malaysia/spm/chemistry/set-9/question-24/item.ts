import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "redox-equilibrium",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$120\\text{ cm}^3$$, $$120\\text{ cm}^3$$, $$0.535\\text{ g}$$",
        },
        {
          correct: true,
          label:
            "$$120\\text{ cm}^3$$, $$60\\text{ cm}^3$$, $$0.535\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$180\\text{ cm}^3$$, $$0\\text{ cm}^3$$, $$0.535\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$120\\text{ cm}^3$$, $$60\\text{ cm}^3$$, $$0.450\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$120\\text{ cm}^3$$, $$120\\text{ cm}^3$$, $$0.535\\text{ g}$$",
        },
        {
          correct: true,
          label:
            "$$120\\text{ cm}^3$$, $$60\\text{ cm}^3$$, $$0.535\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$180\\text{ cm}^3$$, $$0\\text{ cm}^3$$, $$0.535\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$120\\text{ cm}^3$$, $$60\\text{ cm}^3$$, $$0.450\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
