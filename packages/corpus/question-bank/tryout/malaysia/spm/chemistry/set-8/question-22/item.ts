import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "redox-equilibrium",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$1.08\\text{ g}$$, pH $$7.0$$" },
        { correct: false, label: "$$0.54\\text{ g}$$, pH $$1.3$$" },
        { correct: false, label: "$$1.08\\text{ g}$$, pH $$0.70$$" },
        { correct: true, label: "$$1.08\\text{ g}$$, pH $$1.0$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$1.08\\text{ g}$$, pH $$7.0$$" },
        { correct: false, label: "$$0.54\\text{ g}$$, pH $$1.3$$" },
        { correct: false, label: "$$1.08\\text{ g}$$, pH $$0.70$$" },
        { correct: true, label: "$$1.08\\text{ g}$$, pH $$1.0$$" },
      ],
    },
  },
};

export default item;
