import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "redox-equilibrium",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "P, R, Q" },
        { correct: false, label: "R, P, Q" },
        { correct: false, label: "Q, R, P" },
        { correct: false, label: "P, Q, R" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "P, R, Q" },
        { correct: false, label: "R, P, Q" },
        { correct: false, label: "Q, R, P" },
        { correct: false, label: "P, Q, R" },
      ],
    },
  },
};

export default item;
