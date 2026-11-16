import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "polymers",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "II and IV only" },
        { correct: false, label: "I and IV only" },
        { correct: false, label: "I, II and III only" },
        { correct: true, label: "I and III only" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "II dan IV sahaja" },
        { correct: false, label: "I dan IV sahaja" },
        { correct: false, label: "I, II dan III sahaja" },
        { correct: true, label: "I dan III sahaja" },
      ],
    },
  },
};

export default item;
