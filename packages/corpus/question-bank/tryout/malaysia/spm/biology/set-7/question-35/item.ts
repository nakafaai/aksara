import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "genetic-technology",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "I, II and III only" },
        { correct: false, label: "I and II only" },
        { correct: false, label: "I and III only" },
        { correct: false, label: "I, II, III and IV" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "I, II dan III sahaja" },
        { correct: false, label: "I dan II sahaja" },
        { correct: false, label: "I dan III sahaja" },
        { correct: false, label: "I, II, III dan IV" },
      ],
    },
  },
};

export default item;
