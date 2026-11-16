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
        { correct: false, label: "$$1.92\\text{ dm}^3$$, $$5.76\\text{ g}$$" },
        { correct: false, label: "$$5.76\\text{ dm}^3$$, $$2.88\\text{ g}$$" },
        { correct: false, label: "$$0.240\\text{ dm}^3$$, $$2.88\\text{ g}$$" },
        { correct: true, label: "$$1.92\\text{ dm}^3$$, $$2.88\\text{ g}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$1.92\\text{ dm}^3$$, $$5.76\\text{ g}$$" },
        { correct: false, label: "$$5.76\\text{ dm}^3$$, $$2.88\\text{ g}$$" },
        { correct: false, label: "$$0.240\\text{ dm}^3$$, $$2.88\\text{ g}$$" },
        { correct: true, label: "$$1.92\\text{ dm}^3$$, $$2.88\\text{ g}$$" },
      ],
    },
  },
};

export default item;
