import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "coordination-and-response-in-humans",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "T and R" },
        { correct: false, label: "P and S" },
        { correct: false, label: "T and S" },
        { correct: false, label: "P and R" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "T dan R" },
        { correct: false, label: "P dan S" },
        { correct: false, label: "T dan S" },
        { correct: false, label: "P dan R" },
      ],
    },
  },
};

export default item;
