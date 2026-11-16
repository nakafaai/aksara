import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "biodiversity",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "I, II and IV only" },
        { correct: true, label: "I and II only" },
        { correct: false, label: "II and III only" },
        { correct: false, label: "I and III only" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "I, II dan IV sahaja" },
        { correct: true, label: "I dan II sahaja" },
        { correct: false, label: "II dan III sahaja" },
        { correct: false, label: "I dan III sahaja" },
      ],
    },
  },
};

export default item;
