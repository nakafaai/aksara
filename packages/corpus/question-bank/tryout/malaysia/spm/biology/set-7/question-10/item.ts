import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "respiratory-systems",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "I and II only" },
        { correct: false, label: "I, II and III only" },
        { correct: false, label: "I and IV only" },
        { correct: false, label: "II only" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "I dan II sahaja" },
        { correct: false, label: "I, II dan III sahaja" },
        { correct: false, label: "I dan IV sahaja" },
        { correct: false, label: "II sahaja" },
      ],
    },
  },
};

export default item;
