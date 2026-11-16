import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "rate-of-reaction",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "The average rate from 0 s to 180 s is 0.88 cm³ s⁻¹, and the marble had a mass of 0.55 g" },
        { correct: false, label: "The average rate in the first 60 s is 1.47 cm³ s⁻¹, and the marble had a mass of 0.275 g" },
        { correct: false, label: "The average rate in the first 60 s is 0.73 cm³ s⁻¹, and the marble had a mass of 0.55 g" },
        { correct: true, label: "The average rate in the first 60 s is 1.47 cm³ s⁻¹, and the marble had a mass of 0.55 g" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Kadar purata dari 0 s hingga 180 s ialah 0.88 cm³ s⁻¹, dan jisim marmar ialah 0.55 g" },
        { correct: false, label: "Kadar purata dalam 60 s pertama ialah 1.47 cm³ s⁻¹, dan jisim marmar ialah 0.275 g" },
        { correct: false, label: "Kadar purata dalam 60 s pertama ialah 0.73 cm³ s⁻¹, dan jisim marmar ialah 0.55 g" },
        { correct: true, label: "Kadar purata dalam 60 s pertama ialah 1.47 cm³ s⁻¹, dan jisim marmar ialah 0.55 g" },
      ],
    },
  },
};

export default item;
