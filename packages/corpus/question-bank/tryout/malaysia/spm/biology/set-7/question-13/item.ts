import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "immunity-in-humans",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "II only" },
        { correct: false, label: "I and III only" },
        { correct: false, label: "I only" },
        { correct: true, label: "I and IV only" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "II sahaja" },
        { correct: false, label: "I dan III sahaja" },
        { correct: false, label: "I sahaja" },
        { correct: true, label: "I dan IV sahaja" },
      ],
    },
  },
};

export default item;
