import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "periodic-table",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "X, Y, Z" },
        { correct: false, label: "Y, Z, X" },
        { correct: false, label: "X, Z, Y" },
        { correct: true, label: "Z, Y, X" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "X, Y, Z" },
        { correct: false, label: "Y, Z, X" },
        { correct: false, label: "X, Z, Y" },
        { correct: true, label: "Z, Y, X" },
      ],
    },
  },
};

export default item;
