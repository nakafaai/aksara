import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "leaf-structure-and-function",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "About $$56\\%$$, P" },
        { correct: false, label: "$$50\\%$$, R" },
        { correct: true, label: "$$50\\%$$, P" },
        { correct: false, label: "$$45\\%$$, P" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Kira-kira $$56\\%$$, P" },
        { correct: false, label: "$$50\\%$$, R" },
        { correct: true, label: "$$50\\%$$, P" },
        { correct: false, label: "$$45\\%$$, P" },
      ],
    },
  },
};

export default item;
