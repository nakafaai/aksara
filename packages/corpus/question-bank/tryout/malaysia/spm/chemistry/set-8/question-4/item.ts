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
        { correct: false, label: "Carbon dioxide, $$0\\text{ g}$$" },
        { correct: false, label: "Dinitrogen monoxide, $$0\\text{ g}$$" },
        { correct: true, label: "Propane, $$3.60\\text{ g}$$" },
        { correct: false, label: "Propane, $$0.90\\text{ g}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Karbon dioksida, $$0\\text{ g}$$" },
        { correct: false, label: "Dinitrogen monoksida, $$0\\text{ g}$$" },
        { correct: true, label: "Propana, $$3.60\\text{ g}$$" },
        { correct: false, label: "Propana, $$0.90\\text{ g}$$" },
      ],
    },
  },
};

export default item;
