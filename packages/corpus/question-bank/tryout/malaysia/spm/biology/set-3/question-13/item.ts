import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "homeostasis-and-the-human-urinary-system",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "I, II and IV only" },
        { correct: false, label: "I and II only" },
        { correct: false, label: "I, II and III only" },
        { correct: false, label: "II and IV only" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "I, II dan IV sahaja" },
        { correct: false, label: "I dan II sahaja" },
        { correct: false, label: "I, II dan III sahaja" },
        { correct: false, label: "II dan IV sahaja" },
      ],
    },
  },
};

export default item;
