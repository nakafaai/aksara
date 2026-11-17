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
        { correct: false, label: "$$1.00\\text{ dm}^3$$, $$154\\text{ g}$$" },
        { correct: false, label: "$$1.04\\text{ dm}^3$$, $$160\\text{ g}$$" },
        { correct: false, label: "$$2.08\\text{ dm}^3$$, $$154\\text{ g}$$" },
        { correct: true, label: "$$1.04\\text{ dm}^3$$, $$154\\text{ g}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$1.00\\text{ dm}^3$$, $$154\\text{ g}$$" },
        { correct: false, label: "$$1.04\\text{ dm}^3$$, $$160\\text{ g}$$" },
        { correct: false, label: "$$2.08\\text{ dm}^3$$, $$154\\text{ g}$$" },
        { correct: true, label: "$$1.04\\text{ dm}^3$$, $$154\\text{ g}$$" },
      ],
    },
  },
};

export default item;
