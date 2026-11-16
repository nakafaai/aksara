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
        { correct: false, label: "R is chlorine, and its oxide is basic" },
        { correct: true, label: "R is sulfur, its oxide is acidic, and the salt formed is sodium sulfate" },
        { correct: false, label: "R is silicon, and its oxide is amphoteric" },
        { correct: false, label: "R is sulfur, and its oxide is amphoteric because it reacts with an alkali" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "R ialah klorin, dan oksidanya bersifat bes" },
        { correct: true, label: "R ialah sulfur, oksidanya berasid, dan garam yang terbentuk ialah natrium sulfat" },
        { correct: false, label: "R ialah silikon, dan oksidanya amfoterik" },
        { correct: false, label: "R ialah sulfur, dan oksidanya amfoterik kerana ia bertindak balas dengan alkali" },
      ],
    },
  },
};

export default item;
