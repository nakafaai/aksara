import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "redox-equilibrium",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$3.20\\text{ g}$$, $$100\\%$$" },
        { correct: false, label: "$$3.20\\text{ g}$$, $$109\\%$$" },
        { correct: false, label: "$$3.20\\text{ g}$$, $$8.57\\%$$" },
        { correct: true, label: "$$3.20\\text{ g}$$, $$91.4\\%$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$3.20\\text{ g}$$, $$100\\%$$" },
        { correct: false, label: "$$3.20\\text{ g}$$, $$109\\%$$" },
        { correct: false, label: "$$3.20\\text{ g}$$, $$8.57\\%$$" },
        { correct: true, label: "$$3.20\\text{ g}$$, $$91.4\\%$$" },
      ],
    },
  },
};

export default item;
