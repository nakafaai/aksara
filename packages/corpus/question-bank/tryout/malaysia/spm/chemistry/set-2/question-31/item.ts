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
        { correct: false, label: "Hexene has more carbon atoms in each molecule" },
        { correct: false, label: "Hexene has a lower boiling point" },
        { correct: true, label: "Hexene has a higher percentage of carbon by mass" },
        { correct: false, label: "Hexene decolourises bromine water" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Heksena mempunyai lebih banyak atom karbon dalam setiap molekul" },
        { correct: false, label: "Heksena mempunyai takat didih yang lebih rendah" },
        { correct: true, label: "Heksena mempunyai peratus karbon mengikut jisim yang lebih tinggi" },
        { correct: false, label: "Heksena menyahwarnakan air bromin" },
      ],
    },
  },
};

export default item;
