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
        { correct: false, label: "$$2.5\\text{ mol dm}^{-3}$$, pH $$0.60$$" },
        { correct: false, label: "$$0.50\\text{ mol dm}^{-3}$$, pH $$0.30$$" },
        { correct: true, label: "$$5.0\\text{ mol dm}^{-3}$$, pH $$0.30$$" },
        { correct: false, label: "$$5.0\\text{ mol dm}^{-3}$$, pH $$-0.70$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$2.5\\text{ mol dm}^{-3}$$, pH $$0.60$$" },
        { correct: false, label: "$$0.50\\text{ mol dm}^{-3}$$, pH $$0.30$$" },
        { correct: true, label: "$$5.0\\text{ mol dm}^{-3}$$, pH $$0.30$$" },
        { correct: false, label: "$$5.0\\text{ mol dm}^{-3}$$, pH $$-0.70$$" },
      ],
    },
  },
};

export default item;
