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
        { correct: false, label: "Q is magnesium, R is chlorine and T is sodium" },
        { correct: true, label: "Q is aluminium, R is chlorine and T is sodium, and the oxide of R dissolves in water to give an acidic solution" },
        { correct: false, label: "Q is aluminium, R is sulfur and T is sodium" },
        { correct: false, label: "Q is aluminium, R is chlorine and T is magnesium" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Q ialah magnesium, R ialah klorin dan T ialah natrium" },
        { correct: true, label: "Q ialah aluminium, R ialah klorin dan T ialah natrium, dan oksida R larut dalam air menghasilkan larutan berasid" },
        { correct: false, label: "Q ialah aluminium, R ialah sulfur dan T ialah natrium" },
        { correct: false, label: "Q ialah aluminium, R ialah klorin dan T ialah magnesium" },
      ],
    },
  },
};

export default item;
