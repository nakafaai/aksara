import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "consumer-and-industrial-chemistry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$44\\%$$" },
        { correct: false, label: "$$176\\%$$" },
        { correct: true, label: "$$88\\%$$" },
        { correct: false, label: "$$8.8\\%$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$44\\%$$" },
        { correct: false, label: "$$176\\%$$" },
        { correct: true, label: "$$88\\%$$" },
        { correct: false, label: "$$8.8\\%$$" },
      ],
    },
  },
};

export default item;
