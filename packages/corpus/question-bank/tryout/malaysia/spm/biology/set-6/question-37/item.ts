import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "transport-in-plants",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "I, II and III only" },
        { correct: false, label: "II and IV only" },
        { correct: false, label: "I, II, III and IV" },
        { correct: true, label: "I, III and IV only" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "I, II dan III sahaja" },
        { correct: false, label: "II dan IV sahaja" },
        { correct: false, label: "I, II, III dan IV" },
        { correct: true, label: "I, III dan IV sahaja" },
      ],
    },
  },
};

export default item;
