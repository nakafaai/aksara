import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "polymers",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "$$253\\text{ dm}^3$$, $$2.11\\text{ dm}^3$$" },
        {
          correct: false,
          label: "$$240\\text{ dm}^3$$, $$2.00\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$253\\text{ dm}^3$$, $$1.05\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$228\\text{ dm}^3$$, $$1.90\\text{ dm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$253\\text{ dm}^3$$, $$2.11\\text{ dm}^3$$" },
        {
          correct: false,
          label: "$$240\\text{ dm}^3$$, $$2.00\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$253\\text{ dm}^3$$, $$1.05\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$228\\text{ dm}^3$$, $$1.90\\text{ dm}^3$$",
        },
      ],
    },
  },
};

export default item;
