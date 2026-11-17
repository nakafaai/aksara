import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "support-and-movement-in-humans-and-animals",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "I, II and III only" },
        { correct: false, label: "I and III only" },
        { correct: false, label: "II, III and IV only" },
        { correct: false, label: "I, II, III and IV" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "I, II dan III sahaja" },
        { correct: false, label: "I dan III sahaja" },
        { correct: false, label: "II, III dan IV sahaja" },
        { correct: false, label: "I, II, III dan IV" },
      ],
    },
  },
};

export default item;
