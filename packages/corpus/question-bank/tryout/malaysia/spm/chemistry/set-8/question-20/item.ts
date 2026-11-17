import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "manufactured-substances-in-industry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$6.46\\text{ dm}^3$$" },
        { correct: false, label: "$$4.27\\text{ dm}^3$$" },
        { correct: true, label: "$$6.38\\text{ dm}^3$$" },
        { correct: false, label: "$$6.67\\text{ dm}^3$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$6.46\\text{ dm}^3$$" },
        { correct: false, label: "$$4.27\\text{ dm}^3$$" },
        { correct: true, label: "$$6.38\\text{ dm}^3$$" },
        { correct: false, label: "$$6.67\\text{ dm}^3$$" },
      ],
    },
  },
};

export default item;
