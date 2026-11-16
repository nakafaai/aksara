import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "introduction-to-chemistry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$24.34\\text{ cm}^3$$" },
        { correct: false, label: "$$24.20\\text{ cm}^3$$" },
        { correct: true, label: "$$24.25\\text{ cm}^3$$" },
        { correct: false, label: "$$24.28\\text{ cm}^3$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$24.34\\text{ cm}^3$$" },
        { correct: false, label: "$$24.20\\text{ cm}^3$$" },
        { correct: true, label: "$$24.25\\text{ cm}^3$$" },
        { correct: false, label: "$$24.28\\text{ cm}^3$$" },
      ],
    },
  },
};

export default item;
