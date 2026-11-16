import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "periodic-table",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "I only" },
        { correct: false, label: "I and II only" },
        { correct: false, label: "II and III only" },
        { correct: true, label: "I, II and III" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "I sahaja" },
        { correct: false, label: "I dan II sahaja" },
        { correct: false, label: "II dan III sahaja" },
        { correct: true, label: "I, II dan III" },
      ],
    },
  },
};

export default item;
