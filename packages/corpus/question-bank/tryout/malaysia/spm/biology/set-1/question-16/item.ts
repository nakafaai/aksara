import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "homeostasis-and-the-human-urinary-system",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$0.30\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$60\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$1.8\\text{ dm}^3$$",
        },
        {
          correct: true,
          label: "$$3.0\\text{ dm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$0.30\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$60\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$1.8\\text{ dm}^3$$",
        },
        {
          correct: true,
          label: "$$3.0\\text{ dm}^3$$",
        },
      ],
    },
  },
};

export default item;
