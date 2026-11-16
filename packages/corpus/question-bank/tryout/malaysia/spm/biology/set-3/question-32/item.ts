import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "inheritance",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "$$50$$" },
        { correct: false, label: "$$150$$" },
        { correct: false, label: "$$100$$" },
        { correct: false, label: "$$25$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$50$$" },
        { correct: false, label: "$$150$$" },
        { correct: false, label: "$$100$$" },
        { correct: false, label: "$$25$$" },
      ],
    },
  },
};

export default item;
