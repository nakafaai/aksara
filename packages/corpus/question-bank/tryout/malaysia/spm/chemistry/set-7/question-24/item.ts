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
          label: "$$1.44\\text{ dm}^3$$, $$1.44\\text{ dm}^3$$",
        },
        {
          correct: true,
          label: "$$1.92\\text{ dm}^3$$, $$1.44\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$1.92\\text{ dm}^3$$, $$2.16\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$0.960\\text{ dm}^3$$, $$1.44\\text{ dm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$1.44\\text{ dm}^3$$, $$1.44\\text{ dm}^3$$",
        },
        {
          correct: true,
          label: "$$1.92\\text{ dm}^3$$, $$1.44\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$1.92\\text{ dm}^3$$, $$2.16\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$0.960\\text{ dm}^3$$, $$1.44\\text{ dm}^3$$",
        },
      ],
    },
  },
};

export default item;
