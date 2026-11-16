import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "acids-bases-and-salts",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "pH 1.3" },
        { correct: false, label: "pH 7.0" },
        { correct: false, label: "pH 1.0" },
        { correct: false, label: "pH 0.7" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "pH 1.3" },
        { correct: false, label: "pH 7.0" },
        { correct: false, label: "pH 1.0" },
        { correct: false, label: "pH 0.7" },
      ],
    },
  },
};

export default item;
