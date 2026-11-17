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
        { correct: false, label: "II only" },
        { correct: false, label: "II and III only" },
        { correct: true, label: "I and II only" },
        { correct: false, label: "I, II and IV only" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "II sahaja" },
        { correct: false, label: "II dan III sahaja" },
        { correct: true, label: "I dan II sahaja" },
        { correct: false, label: "I, II dan IV sahaja" },
      ],
    },
  },
};

export default item;
