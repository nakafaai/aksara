import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "carbon-compounds",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "Propane, and 30 cm³ of carbon dioxide forms" },
        { correct: false, label: "Propene, and 30 cm³ of carbon dioxide forms" },
        { correct: false, label: "Butane, and 40 cm³ of carbon dioxide forms" },
        { correct: false, label: "Propane, and 70 cm³ of gas is left after cooling to room temperature" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "Propana, dan 30 cm³ karbon dioksida terbentuk" },
        { correct: false, label: "Propena, dan 30 cm³ karbon dioksida terbentuk" },
        { correct: false, label: "Butana, dan 40 cm³ karbon dioksida terbentuk" },
        { correct: false, label: "Propana, dan 70 cm³ gas berbaki selepas disejukkan ke suhu bilik" },
      ],
    },
  },
};

export default item;
