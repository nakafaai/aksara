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
        { correct: false, label: "−1376 kJ mol⁻¹, because no heat escapes from the copper can" },
        { correct: false, label: "−84 kJ mol⁻¹, and about 94% of the heat escaped" },
        { correct: false, label: "−840 kJ mol⁻¹, and about 61% of the heat released escaped to the surroundings" },
        { correct: true, label: "−840 kJ mol⁻¹, and about 39% of the heat released escaped to the surroundings" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "−1376 kJ mol⁻¹, kerana tiada haba terbebas dari bekas kuprum" },
        { correct: false, label: "−84 kJ mol⁻¹, dan kira-kira 94% haba terbebas" },
        { correct: false, label: "−840 kJ mol⁻¹, dan kira-kira 61% haba yang dibebaskan hilang ke persekitaran" },
        { correct: true, label: "−840 kJ mol⁻¹, dan kira-kira 39% haba yang dibebaskan hilang ke persekitaran" },
      ],
    },
  },
};

export default item;
