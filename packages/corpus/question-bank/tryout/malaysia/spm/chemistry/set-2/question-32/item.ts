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
        { correct: false, label: "$$10\\text{ cm}^3$$" },
        { correct: false, label: "$$30\\text{ cm}^3$$" },
        { correct: false, label: "$$40\\text{ cm}^3$$" },
        { correct: true, label: "$$20\\text{ cm}^3$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$10\\text{ cm}^3$$" },
        { correct: false, label: "$$30\\text{ cm}^3$$" },
        { correct: false, label: "$$40\\text{ cm}^3$$" },
        { correct: true, label: "$$20\\text{ cm}^3$$" },
      ],
    },
  },
};

export default item;
