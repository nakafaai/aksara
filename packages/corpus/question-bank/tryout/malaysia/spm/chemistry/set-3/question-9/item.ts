import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "periodic-table",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "The number of shells decreases, and chlorine is the most electronegative" },
        { correct: true, label: "The proton number increases while the valence electrons stay in the same shell, and chlorine is the most electronegative" },
        { correct: false, label: "The proton number increases while the valence electrons stay in the same shell, and sodium is the most electronegative" },
        { correct: false, label: "The repulsion between electrons increases, and argon is the most electronegative" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Bilangan petala berkurang, dan klorin paling elektronegatif" },
        { correct: true, label: "Nombor proton bertambah manakala elektron valens kekal dalam petala yang sama, dan klorin paling elektronegatif" },
        { correct: false, label: "Nombor proton bertambah manakala elektron valens kekal dalam petala yang sama, dan natrium paling elektronegatif" },
        { correct: false, label: "Tolakan antara elektron bertambah, dan argon paling elektronegatif" },
      ],
    },
  },
};

export default item;
