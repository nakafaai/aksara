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
        { correct: true, label: "5.30 g, 25.0 cm³" },
        { correct: false, label: "5.30 g, 12.5 cm³" },
        { correct: false, label: "21.2 g, 25.0 cm³" },
        { correct: false, label: "2.65 g, 12.5 cm³" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "5.30 g, 25.0 cm³" },
        { correct: false, label: "5.30 g, 12.5 cm³" },
        { correct: false, label: "21.2 g, 25.0 cm³" },
        { correct: false, label: "2.65 g, 12.5 cm³" },
      ],
    },
  },
};

export default item;
