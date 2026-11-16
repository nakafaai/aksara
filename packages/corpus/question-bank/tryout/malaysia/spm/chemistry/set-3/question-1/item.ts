import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "introduction-to-chemistry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "Student P" },
        { correct: true, label: "Student Q" },
        { correct: false, label: "Student R" },
        { correct: false, label: "Student S" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Murid P" },
        { correct: true, label: "Murid Q" },
        { correct: false, label: "Murid R" },
        { correct: false, label: "Murid S" },
      ],
    },
  },
};

export default item;
