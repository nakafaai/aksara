import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "introduction-to-biology",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "I and III only" },
        { correct: false, label: "I and II only" },
        { correct: false, label: "I, II and III only" },
        { correct: false, label: "III and IV only" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "I dan III sahaja" },
        { correct: false, label: "I dan II sahaja" },
        { correct: false, label: "I, II dan III sahaja" },
        { correct: false, label: "III dan IV sahaja" },
      ],
    },
  },
};

export default item;
