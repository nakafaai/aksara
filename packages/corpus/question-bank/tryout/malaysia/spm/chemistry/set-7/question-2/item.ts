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
        { correct: true, label: "$$216\\text{ cm}^3$$, $$0.508\\text{ g}$$" },
        { correct: false, label: "$$168\\text{ cm}^3$$, $$0.508\\text{ g}$$" },
        { correct: false, label: "$$216\\text{ cm}^3$$, $$0.762\\text{ g}$$" },
        { correct: false, label: "$$216\\text{ cm}^3$$, $$0.254\\text{ g}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$216\\text{ cm}^3$$, $$0.508\\text{ g}$$" },
        { correct: false, label: "$$168\\text{ cm}^3$$, $$0.508\\text{ g}$$" },
        { correct: false, label: "$$216\\text{ cm}^3$$, $$0.762\\text{ g}$$" },
        { correct: false, label: "$$216\\text{ cm}^3$$, $$0.254\\text{ g}$$" },
      ],
    },
  },
};

export default item;
