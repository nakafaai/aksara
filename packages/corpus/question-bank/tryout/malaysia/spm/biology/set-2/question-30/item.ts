import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "environmental-sustainability",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "Q, S, R, P, U, T" },
        { correct: true, label: "Q, S, P, R, U, T" },
        { correct: false, label: "Q, R, S, P, U, T" },
        { correct: false, label: "Q, S, P, U, R, T" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Q, S, R, P, U, T" },
        { correct: true, label: "Q, S, P, R, U, T" },
        { correct: false, label: "Q, R, S, P, U, T" },
        { correct: false, label: "Q, S, P, U, R, T" },
      ],
    },
  },
};

export default item;
