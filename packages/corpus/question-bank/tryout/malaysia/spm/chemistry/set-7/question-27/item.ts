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
        { correct: false, label: "$$0\\text{ g}$$, $$9.60\\text{ dm}^3$$" },
        { correct: true, label: "$$1.80\\text{ g}$$, $$6.00\\text{ dm}^3$$" },
        { correct: false, label: "$$4.80\\text{ g}$$, $$0\\text{ dm}^3$$" },
        { correct: false, label: "$$1.20\\text{ g}$$, $$7.20\\text{ dm}^3$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$0\\text{ g}$$, $$9.60\\text{ dm}^3$$" },
        { correct: true, label: "$$1.80\\text{ g}$$, $$6.00\\text{ dm}^3$$" },
        { correct: false, label: "$$4.80\\text{ g}$$, $$0\\text{ dm}^3$$" },
        { correct: false, label: "$$1.20\\text{ g}$$, $$7.20\\text{ dm}^3$$" },
      ],
    },
  },
};

export default item;
