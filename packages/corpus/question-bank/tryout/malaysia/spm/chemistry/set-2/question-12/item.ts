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
        { correct: false, label: "X, Y, Z. X is sodium." },
        { correct: false, label: "Z, Y, X. X is aluminium." },
        { correct: false, label: "Y, Z, X. X is phosphorus." },
        { correct: true, label: "Z, Y, X. X is sulfur." },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "X, Y, Z. X ialah natrium." },
        { correct: false, label: "Z, Y, X. X ialah aluminium." },
        { correct: false, label: "Y, Z, X. X ialah fosforus." },
        { correct: true, label: "Z, Y, X. X ialah sulfur." },
      ],
    },
  },
};

export default item;
