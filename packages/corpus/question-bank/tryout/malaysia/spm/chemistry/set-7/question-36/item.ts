import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "thermochemistry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$6.35\\text{ g}$$" },
        { correct: true, label: "$$15.9\\text{ g}$$" },
        { correct: false, label: "$$2.54\\text{ g}$$" },
        { correct: false, label: "$$21.2\\text{ g}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$6.35\\text{ g}$$" },
        { correct: true, label: "$$15.9\\text{ g}$$" },
        { correct: false, label: "$$2.54\\text{ g}$$" },
        { correct: false, label: "$$21.2\\text{ g}$$" },
      ],
    },
  },
};

export default item;
