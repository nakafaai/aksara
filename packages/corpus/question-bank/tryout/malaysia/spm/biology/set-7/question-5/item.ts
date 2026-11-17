import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "chemical-composition-in-a-cell",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "I, II and III only" },
        { correct: true, label: "I, III and IV only" },
        { correct: false, label: "I and IV only" },
        { correct: false, label: "I, II, III and IV" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "I, II dan III sahaja" },
        { correct: true, label: "I, III dan IV sahaja" },
        { correct: false, label: "I dan IV sahaja" },
        { correct: false, label: "I, II, III dan IV" },
      ],
    },
  },
};

export default item;
