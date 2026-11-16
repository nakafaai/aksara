import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "rate-of-reaction",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$20\\text{ s}$$" },
        { correct: false, label: "$$120\\text{ s}$$" },
        { correct: false, label: "$$10\\text{ s}$$" },
        { correct: true, label: "$$40\\text{ s}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$20\\text{ s}$$" },
        { correct: false, label: "$$120\\text{ s}$$" },
        { correct: false, label: "$$10\\text{ s}$$" },
        { correct: true, label: "$$40\\text{ s}$$" },
      ],
    },
  },
};

export default item;
