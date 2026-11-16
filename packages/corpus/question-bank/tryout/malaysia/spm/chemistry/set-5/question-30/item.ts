import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "carbon-compounds",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "Propane, $$4.75\\text{ g}$$" },
        { correct: false, label: "Butane, $$3.60\\text{ g}$$" },
        { correct: true, label: "Butane, $$4.50\\text{ g}$$" },
        { correct: false, label: "Pentane, $$4.35\\text{ g}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Propana, $$4.75\\text{ g}$$" },
        { correct: false, label: "Butana, $$3.60\\text{ g}$$" },
        { correct: true, label: "Butana, $$4.50\\text{ g}$$" },
        { correct: false, label: "Pentana, $$4.35\\text{ g}$$" },
      ],
    },
  },
};

export default item;
