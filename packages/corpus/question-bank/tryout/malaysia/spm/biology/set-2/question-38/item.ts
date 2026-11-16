import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "biodiversity",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$0.01\\%$$" },
        { correct: true, label: "$$50\\%$$" },
        { correct: false, label: "$$1\\%$$" },
        { correct: false, label: "$$99\\%$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$0.01\\%$$" },
        { correct: true, label: "$$50\\%$$" },
        { correct: false, label: "$$1\\%$$" },
        { correct: false, label: "$$99\\%$$" },
      ],
    },
  },
};

export default item;
