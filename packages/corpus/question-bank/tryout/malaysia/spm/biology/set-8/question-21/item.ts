import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "leaf-structure-and-function",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "I and II only" },
        { correct: false, label: "I, III and IV only" },
        { correct: true, label: "I and III only" },
        { correct: false, label: "I only" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "I dan II sahaja" },
        { correct: false, label: "I, III dan IV sahaja" },
        { correct: true, label: "I dan III sahaja" },
        { correct: false, label: "I sahaja" },
      ],
    },
  },
};

export default item;
