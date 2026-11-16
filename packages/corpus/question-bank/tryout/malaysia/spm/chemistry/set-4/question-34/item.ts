import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "thermochemistry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "−58.8 kJ mol⁻¹" },
        { correct: false, label: "−29.4 kJ mol⁻¹" },
        { correct: false, label: "−1.47 kJ mol⁻¹" },
        { correct: false, label: "+58.8 kJ mol⁻¹" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "−58.8 kJ mol⁻¹" },
        { correct: false, label: "−29.4 kJ mol⁻¹" },
        { correct: false, label: "−1.47 kJ mol⁻¹" },
        { correct: false, label: "+58.8 kJ mol⁻¹" },
      ],
    },
  },
};

export default item;
