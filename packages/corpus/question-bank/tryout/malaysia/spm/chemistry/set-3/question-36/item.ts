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
        { correct: false, label: "−50.4 kJ mol⁻¹, and the products have less energy than the reactants" },
        { correct: false, label: "+25.2 kJ mol⁻¹, and the products have more energy than the reactants" },
        { correct: false, label: "+1.26 kJ mol⁻¹, and the products have more energy than the reactants" },
        { correct: true, label: "+50.4 kJ mol⁻¹, and the products have more energy than the reactants" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "−50.4 kJ mol⁻¹, dan hasil mempunyai tenaga lebih rendah daripada bahan tindak balas" },
        { correct: false, label: "+25.2 kJ mol⁻¹, dan hasil mempunyai tenaga lebih tinggi daripada bahan tindak balas" },
        { correct: false, label: "+1.26 kJ mol⁻¹, dan hasil mempunyai tenaga lebih tinggi daripada bahan tindak balas" },
        { correct: true, label: "+50.4 kJ mol⁻¹, dan hasil mempunyai tenaga lebih tinggi daripada bahan tindak balas" },
      ],
    },
  },
};

export default item;
