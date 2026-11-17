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
        { correct: false, label: "$$2.459\\text{ g}$$, $$0.281\\text{ g}$$" },
        { correct: false, label: "$$2.432\\text{ g}$$, $$0.268\\text{ g}$$" },
        { correct: false, label: "$$4.032\\text{ g}$$, $$0.474\\text{ g}$$" },
        { correct: true, label: "$$2.432\\text{ g}$$, $$0.286\\text{ g}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$2.459\\text{ g}$$, $$0.281\\text{ g}$$" },
        { correct: false, label: "$$2.432\\text{ g}$$, $$0.268\\text{ g}$$" },
        { correct: false, label: "$$4.032\\text{ g}$$, $$0.474\\text{ g}$$" },
        { correct: true, label: "$$2.432\\text{ g}$$, $$0.286\\text{ g}$$" },
      ],
    },
  },
};

export default item;
