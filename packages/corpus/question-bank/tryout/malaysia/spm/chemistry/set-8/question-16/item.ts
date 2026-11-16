import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "acids-bases-and-salts",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$0.25\\text{ mol dm}^{-3}$$, pH $$0.60$$" },
        { correct: false, label: "$$1.0\\text{ mol dm}^{-3}$$, pH $$0$$" },
        { correct: true, label: "$$0.50\\text{ mol dm}^{-3}$$, pH $$0.30$$" },
        { correct: false, label: "$$0.010\\text{ mol dm}^{-3}$$, pH $$2.0$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$0.25\\text{ mol dm}^{-3}$$, pH $$0.60$$" },
        { correct: false, label: "$$1.0\\text{ mol dm}^{-3}$$, pH $$0$$" },
        { correct: true, label: "$$0.50\\text{ mol dm}^{-3}$$, pH $$0.30$$" },
        { correct: false, label: "$$0.010\\text{ mol dm}^{-3}$$, pH $$2.0$$" },
      ],
    },
  },
};

export default item;
