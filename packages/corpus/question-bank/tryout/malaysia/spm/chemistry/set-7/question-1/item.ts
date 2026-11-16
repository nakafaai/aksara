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
        { correct: false, label: "$$76.2\\%$$" },
        { correct: false, label: "$$26.6\\%$$" },
        { correct: true, label: "$$75.0\\%$$" },
        { correct: false, label: "$$73.4\\%$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$76.2\\%$$" },
        { correct: false, label: "$$26.6\\%$$" },
        { correct: true, label: "$$75.0\\%$$" },
        { correct: false, label: "$$73.4\\%$$" },
      ],
    },
  },
};

export default item;
