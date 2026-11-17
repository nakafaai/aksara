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
        { correct: true, label: "I and III only" },
        { correct: false, label: "I and II only" },
        { correct: false, label: "I, III and IV only" },
        { correct: false, label: "III only" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "I dan III sahaja" },
        { correct: false, label: "I dan II sahaja" },
        { correct: false, label: "I, III dan IV sahaja" },
        { correct: false, label: "III sahaja" },
      ],
    },
  },
};

export default item;
