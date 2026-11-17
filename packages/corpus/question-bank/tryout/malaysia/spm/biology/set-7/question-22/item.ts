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
        { correct: false, label: "III only" },
        { correct: false, label: "I, II and IV only" },
        { correct: false, label: "I only" },
        { correct: true, label: "I and II only" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "III sahaja" },
        { correct: false, label: "I, II dan IV sahaja" },
        { correct: false, label: "I sahaja" },
        { correct: true, label: "I dan II sahaja" },
      ],
    },
  },
};

export default item;
