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
        { correct: false, label: "I, II and III only" },
        { correct: false, label: "I and IV only" },
        { correct: false, label: "I only" },
        { correct: true, label: "I and II only" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "I, II dan III sahaja" },
        { correct: false, label: "I dan IV sahaja" },
        { correct: false, label: "I sahaja" },
        { correct: true, label: "I dan II sahaja" },
      ],
    },
  },
};

export default item;
