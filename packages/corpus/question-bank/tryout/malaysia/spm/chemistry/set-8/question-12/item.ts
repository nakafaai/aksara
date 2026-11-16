import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "chemical-bonds",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\text{XY}_4$$, $$960\\text{ cm}^3$$" },
        { correct: false, label: "$$\\text{XY}_3$$, $$720\\text{ cm}^3$$" },
        { correct: true, label: "$$\\text{XY}_4$$, $$720\\text{ cm}^3$$" },
        { correct: false, label: "$$\\text{XY}_4$$, $$240\\text{ cm}^3$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\text{XY}_4$$, $$960\\text{ cm}^3$$" },
        { correct: false, label: "$$\\text{XY}_3$$, $$720\\text{ cm}^3$$" },
        { correct: true, label: "$$\\text{XY}_4$$, $$720\\text{ cm}^3$$" },
        { correct: false, label: "$$\\text{XY}_4$$, $$240\\text{ cm}^3$$" },
      ],
    },
  },
};

export default item;
