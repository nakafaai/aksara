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
        { correct: true, label: "pH 2.0" },
        { correct: false, label: "pH 2.3" },
        { correct: false, label: "pH 0.7" },
        { correct: false, label: "pH 1.0" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "pH 2.0" },
        { correct: false, label: "pH 2.3" },
        { correct: false, label: "pH 0.7" },
        { correct: false, label: "pH 1.0" },
      ],
    },
  },
};

export default item;
