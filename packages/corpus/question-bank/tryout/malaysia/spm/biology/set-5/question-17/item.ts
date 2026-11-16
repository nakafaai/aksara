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
        { correct: true, label: "I, III and IV only" },
        { correct: false, label: "I, II and IV only" },
        { correct: false, label: "III and IV only" },
        { correct: false, label: "I, II and III only" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "I, III dan IV sahaja" },
        { correct: false, label: "I, II dan IV sahaja" },
        { correct: false, label: "III dan IV sahaja" },
        { correct: false, label: "I, II dan III sahaja" },
      ],
    },
  },
};

export default item;
