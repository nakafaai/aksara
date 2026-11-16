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
        { correct: false, label: "0.102 mol dm⁻³" },
        { correct: true, label: "0.104 mol dm⁻³" },
        { correct: false, label: "0.0965 mol dm⁻³" },
        { correct: false, label: "0.0984 mol dm⁻³" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "0.102 mol dm⁻³" },
        { correct: true, label: "0.104 mol dm⁻³" },
        { correct: false, label: "0.0965 mol dm⁻³" },
        { correct: false, label: "0.0984 mol dm⁻³" },
      ],
    },
  },
};

export default item;
