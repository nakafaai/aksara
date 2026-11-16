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
        { correct: true, label: "Q and P" },
        { correct: false, label: "P and Q" },
        { correct: false, label: "R and P" },
        { correct: false, label: "Q and R" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "Q dan P" },
        { correct: false, label: "P dan Q" },
        { correct: false, label: "R dan P" },
        { correct: false, label: "Q dan R" },
      ],
    },
  },
};

export default item;
