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
        { correct: true, label: "$$24\\%$$" },
        { correct: false, label: "$$76\\%$$" },
        { correct: false, label: "$$48\\%$$" },
        { correct: false, label: "$$12\\%$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$24\\%$$" },
        { correct: false, label: "$$76\\%$$" },
        { correct: false, label: "$$48\\%$$" },
        { correct: false, label: "$$12\\%$$" },
      ],
    },
  },
};

export default item;
