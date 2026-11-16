import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "nutrition-in-plants",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "P with S, and only P turns blue-black" },
        { correct: false, label: "P with R, and only P turns blue-black" },
        { correct: false, label: "Q with S, and P and Q turn blue-black" },
        { correct: false, label: "P with S, and P and R turn blue-black" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "P dengan S, dan hanya P menjadi biru tua" },
        { correct: false, label: "P dengan R, dan hanya P menjadi biru tua" },
        { correct: false, label: "Q dengan S, dan P serta Q menjadi biru tua" },
        { correct: false, label: "P dengan S, dan P serta R menjadi biru tua" },
      ],
    },
  },
};

export default item;
