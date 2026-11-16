import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "introduction-to-chemistry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "P and R only" },
        { correct: false, label: "Q and S only" },
        { correct: true, label: "P, Q and S" },
        { correct: false, label: "P, Q, R and S" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "P dan R sahaja" },
        { correct: false, label: "Q dan S sahaja" },
        { correct: true, label: "P, Q dan S" },
        { correct: false, label: "P, Q, R dan S" },
      ],
    },
  },
};

export default item;
