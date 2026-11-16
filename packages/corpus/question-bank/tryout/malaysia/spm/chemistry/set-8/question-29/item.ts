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
        { correct: true, label: "$$1.20\\text{ dm}^3$$, $$3.00\\text{ g}$$" },
        { correct: false, label: "$$3.60\\text{ dm}^3$$, $$3.00\\text{ g}$$" },
        { correct: false, label: "$$1.20\\text{ dm}^3$$, $$2.30\\text{ g}$$" },
        { correct: false, label: "$$0.60\\text{ dm}^3$$, $$3.00\\text{ g}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$1.20\\text{ dm}^3$$, $$3.00\\text{ g}$$" },
        { correct: false, label: "$$3.60\\text{ dm}^3$$, $$3.00\\text{ g}$$" },
        { correct: false, label: "$$1.20\\text{ dm}^3$$, $$2.30\\text{ g}$$" },
        { correct: false, label: "$$0.60\\text{ dm}^3$$, $$3.00\\text{ g}$$" },
      ],
    },
  },
};

export default item;
