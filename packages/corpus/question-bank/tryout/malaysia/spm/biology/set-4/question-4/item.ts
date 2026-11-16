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
        { correct: false, label: "II and IV only" },
        { correct: false, label: "I and IV only" },
        { correct: true, label: "I and II only" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "I, II dan III sahaja" },
        { correct: false, label: "II dan IV sahaja" },
        { correct: false, label: "I dan IV sahaja" },
        { correct: true, label: "I dan II sahaja" },
      ],
    },
  },
};

export default item;
