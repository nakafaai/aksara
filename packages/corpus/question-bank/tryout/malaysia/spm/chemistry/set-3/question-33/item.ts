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
        { correct: true, label: "−54.6 kJ mol⁻¹" },
        { correct: false, label: "−27.3 kJ mol⁻¹" },
        { correct: false, label: "−5.46 kJ mol⁻¹" },
        { correct: false, label: "+54.6 kJ mol⁻¹" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "−54.6 kJ mol⁻¹" },
        { correct: false, label: "−27.3 kJ mol⁻¹" },
        { correct: false, label: "−5.46 kJ mol⁻¹" },
        { correct: false, label: "+54.6 kJ mol⁻¹" },
      ],
    },
  },
};

export default item;
