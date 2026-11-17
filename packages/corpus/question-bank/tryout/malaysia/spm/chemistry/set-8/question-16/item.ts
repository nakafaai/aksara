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
        { correct: false, label: "$$283\\text{ cm}^3$$, pH $$0.23$$" },
        { correct: false, label: "$$120\\text{ cm}^3$$, pH $$0.30$$" },
        { correct: true, label: "$$142\\text{ cm}^3$$, pH $$0.23$$" },
        { correct: false, label: "$$142\\text{ cm}^3$$, pH $$-1.07$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$283\\text{ cm}^3$$, pH $$0.23$$" },
        { correct: false, label: "$$120\\text{ cm}^3$$, pH $$0.30$$" },
        { correct: true, label: "$$142\\text{ cm}^3$$, pH $$0.23$$" },
        { correct: false, label: "$$142\\text{ cm}^3$$, pH $$-1.07$$" },
      ],
    },
  },
};

export default item;
