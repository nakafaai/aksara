import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "coordination-and-response-in-humans",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "With P, the muscle cannot contract; with Q, the muscle stays contracted" },
        { correct: false, label: "With P, no acetylcholine is released; with Q, the muscle cannot contract" },
        { correct: false, label: "With P, the muscle contracts and relaxes normally; with Q, the muscle stays contracted" },
        { correct: true, label: "With P, the muscle stays contracted; with Q, the muscle cannot contract" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Dengan P, otot tidak dapat mengecut; dengan Q, otot kekal mengecut" },
        { correct: false, label: "Dengan P, tiada asetilkolina dibebaskan; dengan Q, otot tidak dapat mengecut" },
        { correct: false, label: "Dengan P, otot mengecut dan mengendur seperti biasa; dengan Q, otot kekal mengecut" },
        { correct: true, label: "Dengan P, otot kekal mengecut; dengan Q, otot tidak dapat mengecut" },
      ],
    },
  },
};

export default item;
