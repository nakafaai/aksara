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
        { correct: true, label: "−210 kJ mol⁻¹, and with 100 cm³ of the same solution the rise is still 10.0 °C" },
        { correct: false, label: "−210 kJ mol⁻¹, and with 100 cm³ of the same solution the rise doubles to 20.0 °C" },
        { correct: false, label: "−105 kJ mol⁻¹, and with 100 cm³ of the same solution the rise halves to 5.0 °C" },
        { correct: false, label: "−21.0 kJ mol⁻¹, and with 100 cm³ of the same solution the rise is still 10.0 °C" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "−210 kJ mol⁻¹, dan dengan 100 cm³ larutan yang sama kenaikannya tetap 10.0 °C" },
        { correct: false, label: "−210 kJ mol⁻¹, dan dengan 100 cm³ larutan yang sama kenaikannya berganda kepada 20.0 °C" },
        { correct: false, label: "−105 kJ mol⁻¹, dan dengan 100 cm³ larutan yang sama kenaikannya separuh, iaitu 5.0 °C" },
        { correct: false, label: "−21.0 kJ mol⁻¹, dan dengan 100 cm³ larutan yang sama kenaikannya tetap 10.0 °C" },
      ],
    },
  },
};

export default item;
