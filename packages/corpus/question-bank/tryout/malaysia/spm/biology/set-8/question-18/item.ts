import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "transport-in-humans-and-animals",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "I, II and IV only" },
        { correct: false, label: "I only" },
        { correct: true, label: "I and II only" },
        { correct: false, label: "I, II and III only" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "I, II dan IV sahaja" },
        { correct: false, label: "I sahaja" },
        { correct: true, label: "I dan II sahaja" },
        { correct: false, label: "I, II dan III sahaja" },
      ],
    },
  },
};

export default item;
