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
        { correct: true, label: "$$7.20\\text{ cm}^3$$" },
        { correct: false, label: "$$9.00\\text{ cm}^3$$" },
        { correct: false, label: "$$72.0\\text{ cm}^3$$" },
        { correct: false, label: "$$8.00\\text{ cm}^3$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$7.20\\text{ cm}^3$$" },
        { correct: false, label: "$$9.00\\text{ cm}^3$$" },
        { correct: false, label: "$$72.0\\text{ cm}^3$$" },
        { correct: false, label: "$$8.00\\text{ cm}^3$$" },
      ],
    },
  },
};

export default item;
