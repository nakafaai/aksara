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
        { correct: false, label: "I, II and III only" },
        { correct: false, label: "III and IV only" },
        { correct: false, label: "I, III and IV only" },
        { correct: true, label: "I and III only" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "I, II dan III sahaja" },
        { correct: false, label: "III dan IV sahaja" },
        { correct: false, label: "I, III dan IV sahaja" },
        { correct: true, label: "I dan III sahaja" },
      ],
    },
  },
};

export default item;
