import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "thermochemistry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$63.9\\%$$" },
        { correct: false, label: "$$120\\%$$" },
        { correct: true, label: "$$83.3\\%$$" },
        { correct: false, label: "$$1.25\\%$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$63.9\\%$$" },
        { correct: false, label: "$$120\\%$$" },
        { correct: true, label: "$$83.3\\%$$" },
        { correct: false, label: "$$1.25\\%$$" },
      ],
    },
  },
};

export default item;
