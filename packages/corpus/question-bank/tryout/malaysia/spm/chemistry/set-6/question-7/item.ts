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
        { correct: true, label: "$$72.0\\text{ cm}^3$$" },
        { correct: false, label: "$$90.0\\text{ cm}^3$$" },
        { correct: false, label: "$$80.0\\text{ cm}^3$$" },
        { correct: false, label: "$$720\\text{ cm}^3$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$72.0\\text{ cm}^3$$" },
        { correct: false, label: "$$90.0\\text{ cm}^3$$" },
        { correct: false, label: "$$80.0\\text{ cm}^3$$" },
        { correct: false, label: "$$720\\text{ cm}^3$$" },
      ],
    },
  },
};

export default item;
