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
            "$$0.800\\text{ g}$$, $$1.27\\text{ g}$$, $$50.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$1.20\\text{ g}$$, $$1.91\\text{ g}$$, $$150\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$0.800\\text{ g}$$, $$0.635\\text{ g}$$, $$150\\text{ cm}^3$$",
        },
        {
          correct: true,
          label:
            "$$0.800\\text{ g}$$, $$1.27\\text{ g}$$, $$150\\text{ cm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$0.800\\text{ g}$$, $$1.27\\text{ g}$$, $$50.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$1.20\\text{ g}$$, $$1.91\\text{ g}$$, $$150\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$0.800\\text{ g}$$, $$0.635\\text{ g}$$, $$150\\text{ cm}^3$$",
        },
        {
          correct: true,
          label:
            "$$0.800\\text{ g}$$, $$1.27\\text{ g}$$, $$150\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;
