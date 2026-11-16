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
        { correct: false, label: "$$1.20\\text{ dm}^3$$, $$0\\text{ g}$$" },
        { correct: true, label: "$$0.96\\text{ dm}^3$$, $$0.66\\text{ g}$$" },
        { correct: false, label: "$$0.60\\text{ dm}^3$$, $$0\\text{ g}$$" },
        { correct: false, label: "$$0.96\\text{ dm}^3$$, $$1.32\\text{ g}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$1.20\\text{ dm}^3$$, $$0\\text{ g}$$" },
        { correct: true, label: "$$0.96\\text{ dm}^3$$, $$0.66\\text{ g}$$" },
        { correct: false, label: "$$0.60\\text{ dm}^3$$, $$0\\text{ g}$$" },
        { correct: false, label: "$$0.96\\text{ dm}^3$$, $$1.32\\text{ g}$$" },
      ],
    },
  },
};

export default item;
