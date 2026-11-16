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
        { correct: false, label: "The concentration of sodium thiosulfate increases with temperature" },
        { correct: false, label: "A higher temperature lowers the activation energy" },
        { correct: false, label: "More sulfur is produced at a higher temperature" },
        { correct: true, label: "The particles have more kinetic energy, so more collisions reach the activation energy" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Kepekatan natrium tiosulfat bertambah dengan suhu" },
        { correct: false, label: "Suhu yang lebih tinggi merendahkan tenaga pengaktifan" },
        { correct: false, label: "Lebih banyak sulfur terhasil pada suhu yang lebih tinggi" },
        { correct: true, label: "Zarah mempunyai lebih banyak tenaga kinetik, jadi lebih banyak perlanggaran mencapai tenaga pengaktifan" },
      ],
    },
  },
};

export default item;
