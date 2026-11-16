import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "consumer-and-industrial-chemistry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$0.0447\\text{ g}$$" },
        { correct: true, label: "$$0.0989\\text{ g}$$" },
        { correct: false, label: "$$0.321\\text{ g}$$" },
        { correct: false, label: "$$2.98\\text{ g}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$0.0447\\text{ g}$$" },
        { correct: true, label: "$$0.0989\\text{ g}$$" },
        { correct: false, label: "$$0.321\\text{ g}$$" },
        { correct: false, label: "$$2.98\\text{ g}$$" },
      ],
    },
  },
};

export default item;
