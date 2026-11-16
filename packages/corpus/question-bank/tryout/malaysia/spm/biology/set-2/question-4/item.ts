import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "chemical-composition-in-a-cell",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$50$$" },
        { correct: true, label: "$$49$$" },
        { correct: false, label: "$$51$$" },
        { correct: false, label: "$$52$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$50$$" },
        { correct: true, label: "$$49$$" },
        { correct: false, label: "$$51$$" },
        { correct: false, label: "$$52$$" },
      ],
    },
  },
};

export default item;
