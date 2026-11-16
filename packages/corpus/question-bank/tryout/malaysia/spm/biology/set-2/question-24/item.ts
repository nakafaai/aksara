import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "transport-in-plants",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "I and II only" },
        { correct: false, label: "II and III only" },
        { correct: false, label: "I and III only" },
        { correct: true, label: "I, III and IV only" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "I dan II sahaja" },
        { correct: false, label: "II dan III sahaja" },
        { correct: false, label: "I dan III sahaja" },
        { correct: true, label: "I, III dan IV sahaja" },
      ],
    },
  },
};

export default item;
