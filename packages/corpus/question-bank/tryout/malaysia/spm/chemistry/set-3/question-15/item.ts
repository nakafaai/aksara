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
        { correct: false, label: "9.8 g dm⁻³" },
        { correct: false, label: "39.2 g dm⁻³" },
        { correct: false, label: "30.6 g dm⁻³" },
        { correct: true, label: "19.6 g dm⁻³" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "9.8 g dm⁻³" },
        { correct: false, label: "39.2 g dm⁻³" },
        { correct: false, label: "30.6 g dm⁻³" },
        { correct: true, label: "19.6 g dm⁻³" },
      ],
    },
  },
};

export default item;
