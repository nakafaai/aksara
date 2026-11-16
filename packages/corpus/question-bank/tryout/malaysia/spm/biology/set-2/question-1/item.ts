import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "introduction-to-biology",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "P and Q only" },
        { correct: false, label: "P, Q, S and U only" },
        { correct: true, label: "P, Q and U only" },
        { correct: false, label: "P, Q, T and U only" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "P dan Q sahaja" },
        { correct: false, label: "P, Q, S dan U sahaja" },
        { correct: true, label: "P, Q dan U sahaja" },
        { correct: false, label: "P, Q, T dan U sahaja" },
      ],
    },
  },
};

export default item;
