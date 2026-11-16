import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "chemical-bonds",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "I and III only" },
        { correct: false, label: "I, II and III only" },
        { correct: false, label: "I and IV only" },
        { correct: false, label: "II and III only" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "I dan III sahaja" },
        { correct: false, label: "I, II dan III sahaja" },
        { correct: false, label: "I dan IV sahaja" },
        { correct: false, label: "II dan III sahaja" },
      ],
    },
  },
};

export default item;
