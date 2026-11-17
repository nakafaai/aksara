import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "response-in-plants",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "I, III and IV only" },
        { correct: true, label: "I, II and III only" },
        { correct: false, label: "I only" },
        { correct: false, label: "I, II, III and IV" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "I, III dan IV sahaja" },
        { correct: true, label: "I, II dan III sahaja" },
        { correct: false, label: "I sahaja" },
        { correct: false, label: "I, II, III dan IV" },
      ],
    },
  },
};

export default item;
