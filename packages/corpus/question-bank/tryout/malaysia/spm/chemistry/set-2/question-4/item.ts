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
          correct: false,
          label:
            "$$1.59\\text{ g}$$, $$0.960\\text{ dm}^3$$, $$0.360\\text{ dm}^3$$",
        },
        {
          correct: true,
          label:
            "$$1.59\\text{ g}$$, $$1.20\\text{ dm}^3$$, $$0.450\\text{ dm}^3$$",
        },
        {
          correct: false,
          label:
            "$$1.59\\text{ g}$$, $$1.20\\text{ dm}^3$$, $$0.600\\text{ dm}^3$$",
        },
        {
          correct: false,
          label:
            "$$1.59\\text{ g}$$, $$1.20\\text{ dm}^3$$, $$0\\text{ dm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$1.59\\text{ g}$$, $$0.960\\text{ dm}^3$$, $$0.360\\text{ dm}^3$$",
        },
        {
          correct: true,
          label:
            "$$1.59\\text{ g}$$, $$1.20\\text{ dm}^3$$, $$0.450\\text{ dm}^3$$",
        },
        {
          correct: false,
          label:
            "$$1.59\\text{ g}$$, $$1.20\\text{ dm}^3$$, $$0.600\\text{ dm}^3$$",
        },
        {
          correct: false,
          label:
            "$$1.59\\text{ g}$$, $$1.20\\text{ dm}^3$$, $$0\\text{ dm}^3$$",
        },
      ],
    },
  },
};

export default item;
