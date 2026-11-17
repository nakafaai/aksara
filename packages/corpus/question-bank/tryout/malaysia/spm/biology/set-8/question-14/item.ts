import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "coordination-and-response-in-humans",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "I, II and III only" },
        { correct: false, label: "IV only" },
        { correct: false, label: "I only" },
        { correct: false, label: "I, II, III and IV" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "I, II dan III sahaja" },
        { correct: false, label: "IV sahaja" },
        { correct: false, label: "I sahaja" },
        { correct: false, label: "I, II, III dan IV" },
      ],
    },
  },
};

export default item;
