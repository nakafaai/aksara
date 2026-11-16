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
        { correct: false, label: "$$13.9\\text{ g}$$" },
        { correct: false, label: "$$3.47\\text{ g}$$" },
        { correct: false, label: "$$6.62\\text{ g}$$" },
        { correct: true, label: "$$6.95\\text{ g}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$13.9\\text{ g}$$" },
        { correct: false, label: "$$3.47\\text{ g}$$" },
        { correct: false, label: "$$6.62\\text{ g}$$" },
        { correct: true, label: "$$6.95\\text{ g}$$" },
      ],
    },
  },
};

export default item;
