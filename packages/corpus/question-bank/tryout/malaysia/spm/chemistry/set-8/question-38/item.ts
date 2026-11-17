import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "polymers",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$120\\text{ g}$$, $$154\\text{ g}$$" },
        { correct: false, label: "$$125\\text{ g}$$, $$120\\text{ g}$$" },
        { correct: false, label: "$$65\\text{ g}$$, $$77\\text{ g}$$" },
        { correct: true, label: "$$125\\text{ g}$$, $$154\\text{ g}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$120\\text{ g}$$, $$154\\text{ g}$$" },
        { correct: false, label: "$$125\\text{ g}$$, $$120\\text{ g}$$" },
        { correct: false, label: "$$65\\text{ g}$$, $$77\\text{ g}$$" },
        { correct: true, label: "$$125\\text{ g}$$, $$154\\text{ g}$$" },
      ],
    },
  },
};

export default item;
