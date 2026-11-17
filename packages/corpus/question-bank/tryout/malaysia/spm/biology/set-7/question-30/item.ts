import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "ecosystem",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "I, II and IV only" },
        { correct: false, label: "I, II and III only" },
        { correct: false, label: "I and IV only" },
        { correct: false, label: "I and II only" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "I, II dan IV sahaja" },
        { correct: false, label: "I, II dan III sahaja" },
        { correct: false, label: "I dan IV sahaja" },
        { correct: false, label: "I dan II sahaja" },
      ],
    },
  },
};

export default item;
