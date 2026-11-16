import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "mole-concept",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$10.0\\text{ g}$$" },
        { correct: false, label: "$$4.0\\text{ g}$$" },
        { correct: true, label: "$$8.0\\text{ g}$$" },
        { correct: false, label: "$$12.0\\text{ g}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$10.0\\text{ g}$$" },
        { correct: false, label: "$$4.0\\text{ g}$$" },
        { correct: true, label: "$$8.0\\text{ g}$$" },
        { correct: false, label: "$$12.0\\text{ g}$$" },
      ],
    },
  },
};

export default item;
