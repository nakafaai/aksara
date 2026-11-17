import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "matter-and-atomic-structure",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "$$216\\text{ cm}^3$$, $$216\\text{ cm}^3$$" },
        { correct: false, label: "$$216\\text{ cm}^3$$, $$168\\text{ cm}^3$$" },
        { correct: false, label: "$$240\\text{ cm}^3$$, $$216\\text{ cm}^3$$" },
        { correct: false, label: "$$216\\text{ cm}^3$$, $$240\\text{ cm}^3$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$216\\text{ cm}^3$$, $$216\\text{ cm}^3$$" },
        { correct: false, label: "$$216\\text{ cm}^3$$, $$168\\text{ cm}^3$$" },
        { correct: false, label: "$$240\\text{ cm}^3$$, $$216\\text{ cm}^3$$" },
        { correct: false, label: "$$216\\text{ cm}^3$$, $$240\\text{ cm}^3$$" },
      ],
    },
  },
};

export default item;
