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
        { correct: true, label: "I, II and IV only" },
        { correct: false, label: "I, II, III and IV" },
        { correct: false, label: "I and IV only" },
        { correct: false, label: "I and II only" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "I, II dan IV sahaja" },
        { correct: false, label: "I, II, III dan IV" },
        { correct: false, label: "I dan IV sahaja" },
        { correct: false, label: "I dan II sahaja" },
      ],
    },
  },
};

export default item;
