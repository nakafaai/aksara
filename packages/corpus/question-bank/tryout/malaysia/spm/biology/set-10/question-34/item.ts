import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "ecosystem",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "I and III only" },
        { correct: false, label: "II, III and IV only" },
        { correct: false, label: "I, II, III and IV" },
        { correct: true, label: "I, III and IV only" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "I dan III sahaja" },
        { correct: false, label: "II, III dan IV sahaja" },
        { correct: false, label: "I, II, III dan IV" },
        { correct: true, label: "I, III dan IV sahaja" },
      ],
    },
  },
};

export default item;
