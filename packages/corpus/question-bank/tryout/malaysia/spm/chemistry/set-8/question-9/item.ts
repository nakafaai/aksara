import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "periodic-table",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$57.7\\text{ g}$$, $$65.0\\text{ g}$$" },
        { correct: true, label: "$$28.8\\text{ g}$$, $$65.0\\text{ g}$$" },
        { correct: false, label: "$$28.8\\text{ g}$$, $$130\\text{ g}$$" },
        { correct: false, label: "$$14.4\\text{ g}$$, $$32.5\\text{ g}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$57.7\\text{ g}$$, $$65.0\\text{ g}$$" },
        { correct: true, label: "$$28.8\\text{ g}$$, $$65.0\\text{ g}$$" },
        { correct: false, label: "$$28.8\\text{ g}$$, $$130\\text{ g}$$" },
        { correct: false, label: "$$14.4\\text{ g}$$, $$32.5\\text{ g}$$" },
      ],
    },
  },
};

export default item;
