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
        { correct: false, label: "$$60\\text{ g}$$" },
        { correct: false, label: "$$34\\text{ g}$$" },
        { correct: false, label: "$$240\\text{ g}$$" },
        { correct: true, label: "$$120\\text{ g}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$60\\text{ g}$$" },
        { correct: false, label: "$$34\\text{ g}$$" },
        { correct: false, label: "$$240\\text{ g}$$" },
        { correct: true, label: "$$120\\text{ g}$$" },
      ],
    },
  },
};

export default item;
