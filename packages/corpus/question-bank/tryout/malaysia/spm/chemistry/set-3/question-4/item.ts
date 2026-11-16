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
        { correct: false, label: "$$72.0\\text{ dm}^3$$" },
        { correct: false, label: "$$48.0\\text{ dm}^3$$" },
        { correct: false, label: "$$4.80\\text{ dm}^3$$" },
        { correct: true, label: "$$76.8\\text{ dm}^3$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$72.0\\text{ dm}^3$$" },
        { correct: false, label: "$$48.0\\text{ dm}^3$$" },
        { correct: false, label: "$$4.80\\text{ dm}^3$$" },
        { correct: true, label: "$$76.8\\text{ dm}^3$$" },
      ],
    },
  },
};

export default item;
