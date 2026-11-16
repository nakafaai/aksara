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
        { correct: true, label: "5.30 g, 0.050 mol dm⁻³" },
        { correct: false, label: "5.30 g, 0.80 mol dm⁻³" },
        { correct: false, label: "21.2 g, 0.050 mol dm⁻³" },
        { correct: false, label: "2.65 g, 0.025 mol dm⁻³" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "5.30 g, 0.050 mol dm⁻³" },
        { correct: false, label: "5.30 g, 0.80 mol dm⁻³" },
        { correct: false, label: "21.2 g, 0.050 mol dm⁻³" },
        { correct: false, label: "2.65 g, 0.025 mol dm⁻³" },
      ],
    },
  },
};

export default item;
