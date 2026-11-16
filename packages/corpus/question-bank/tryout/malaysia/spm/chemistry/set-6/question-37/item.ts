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
        { correct: true, label: "$$253\\text{ dm}^3$$, $$1.82\\text{ kg}$$" },
        { correct: false, label: "$$240\\text{ dm}^3$$, $$1.73\\text{ kg}$$" },
        { correct: false, label: "$$253\\text{ dm}^3$$, $$0.911\\text{ kg}$$" },
        { correct: false, label: "$$228\\text{ dm}^3$$, $$1.64\\text{ kg}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$253\\text{ dm}^3$$, $$1.82\\text{ kg}$$" },
        { correct: false, label: "$$240\\text{ dm}^3$$, $$1.73\\text{ kg}$$" },
        { correct: false, label: "$$253\\text{ dm}^3$$, $$0.911\\text{ kg}$$" },
        { correct: false, label: "$$228\\text{ dm}^3$$, $$1.64\\text{ kg}$$" },
      ],
    },
  },
};

export default item;
