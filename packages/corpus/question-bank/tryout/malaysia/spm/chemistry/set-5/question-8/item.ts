import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "mole-concept",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$3.3\\%$$, $$0.04\\text{ g}$$" },
        { correct: true, label: "$$20\\%$$, $$0.20\\text{ g}$$" },
        { correct: false, label: "$$20\\%$$, $$0.60\\text{ g}$$" },
        { correct: false, label: "$$6.7\\%$$, $$0.20\\text{ g}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$3.3\\%$$, $$0.04\\text{ g}$$" },
        { correct: true, label: "$$20\\%$$, $$0.20\\text{ g}$$" },
        { correct: false, label: "$$20\\%$$, $$0.60\\text{ g}$$" },
        { correct: false, label: "$$6.7\\%$$, $$0.20\\text{ g}$$" },
      ],
    },
  },
};

export default item;
