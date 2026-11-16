import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "rate-of-reaction",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$26\\text{ s}$$" },
        { correct: false, label: "$$200\\text{ s}$$" },
        { correct: false, label: "$$8\\text{ s}$$" },
        { correct: true, label: "$$87\\text{ s}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$26\\text{ s}$$" },
        { correct: false, label: "$$200\\text{ s}$$" },
        { correct: false, label: "$$8\\text{ s}$$" },
        { correct: true, label: "$$87\\text{ s}$$" },
      ],
    },
  },
};

export default item;
