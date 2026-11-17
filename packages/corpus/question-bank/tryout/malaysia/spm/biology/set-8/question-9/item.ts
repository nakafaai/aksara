import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "cellular-respiration",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "I and III only" },
        { correct: true, label: "I, III and IV only" },
        { correct: false, label: "I, II, III and IV" },
        { correct: false, label: "III and IV only" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "I dan III sahaja" },
        { correct: true, label: "I, III dan IV sahaja" },
        { correct: false, label: "I, II, III dan IV" },
        { correct: false, label: "III dan IV sahaja" },
      ],
    },
  },
};

export default item;
