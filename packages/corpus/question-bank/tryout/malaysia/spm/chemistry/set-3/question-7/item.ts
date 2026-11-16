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
        { correct: false, label: "$$60\\text{ cm}^3$$" },
        { correct: false, label: "$$150\\text{ cm}^3$$" },
        { correct: false, label: "$$190\\text{ cm}^3$$" },
        { correct: true, label: "$$110\\text{ cm}^3$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$60\\text{ cm}^3$$" },
        { correct: false, label: "$$150\\text{ cm}^3$$" },
        { correct: false, label: "$$190\\text{ cm}^3$$" },
        { correct: true, label: "$$110\\text{ cm}^3$$" },
      ],
    },
  },
};

export default item;
