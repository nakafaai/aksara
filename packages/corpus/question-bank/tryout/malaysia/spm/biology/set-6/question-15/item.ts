import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "reproduction-and-growth-in-humans-and-animals",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "I and II only" },
        { correct: false, label: "II and IV only" },
        { correct: false, label: "I and IV only" },
        { correct: true, label: "I, II and III only" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "I dan II sahaja" },
        { correct: false, label: "II dan IV sahaja" },
        { correct: false, label: "I dan IV sahaja" },
        { correct: true, label: "I, II dan III sahaja" },
      ],
    },
  },
};

export default item;
