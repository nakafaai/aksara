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
        { correct: false, label: "3.8 V, with zinc as the negative terminal" },
        { correct: true, label: "1.6 V, with magnesium as the negative terminal" },
        { correct: false, label: "1.6 V, with zinc as the negative terminal" },
        { correct: false, label: "3.8 V, with magnesium as the negative terminal" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "3.8 V, dengan zink sebagai terminal negatif" },
        { correct: true, label: "1.6 V, dengan magnesium sebagai terminal negatif" },
        { correct: false, label: "1.6 V, dengan zink sebagai terminal negatif" },
        { correct: false, label: "3.8 V, dengan magnesium sebagai terminal negatif" },
      ],
    },
  },
};

export default item;
