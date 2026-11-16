import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "mole-concept",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "$$48\\%$$" },
        { correct: false, label: "$$52\\%$$" },
        { correct: false, label: "$$67\\%$$" },
        { correct: false, label: "$$34\\%$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$48\\%$$" },
        { correct: false, label: "$$52\\%$$" },
        { correct: false, label: "$$67\\%$$" },
        { correct: false, label: "$$34\\%$$" },
      ],
    },
  },
};

export default item;
