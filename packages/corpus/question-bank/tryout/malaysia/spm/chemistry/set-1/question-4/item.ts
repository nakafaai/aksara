import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "mole-concept",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$1.2\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$2.4\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$1.12\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$0.60\\text{ dm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$1.2\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$2.4\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$1.12\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$0.60\\text{ dm}^3$$",
        },
      ],
    },
  },
};

export default item;
