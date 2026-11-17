import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "carbon-compounds",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$1.20\\text{ dm}^3$$, $$2.90\\text{ g}$$" },
        { correct: false, label: "$$0.96\\text{ dm}^3$$, $$2.24\\text{ g}$$" },
        { correct: true, label: "$$0.96\\text{ dm}^3$$, $$2.32\\text{ g}$$" },
        { correct: false, label: "$$0.96\\text{ dm}^3$$, $$1.16\\text{ g}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$1.20\\text{ dm}^3$$, $$2.90\\text{ g}$$" },
        { correct: false, label: "$$0.96\\text{ dm}^3$$, $$2.24\\text{ g}$$" },
        { correct: true, label: "$$0.96\\text{ dm}^3$$, $$2.32\\text{ g}$$" },
        { correct: false, label: "$$0.96\\text{ dm}^3$$, $$1.16\\text{ g}$$" },
      ],
    },
  },
};

export default item;
