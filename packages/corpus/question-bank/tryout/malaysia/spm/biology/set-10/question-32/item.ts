import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "variation",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "II and III only" },
        { correct: false, label: "I, II and III only" },
        { correct: false, label: "II, III and IV only" },
        { correct: false, label: "I and IV only" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "II dan III sahaja" },
        { correct: false, label: "I, II dan III sahaja" },
        { correct: false, label: "II, III dan IV sahaja" },
        { correct: false, label: "I dan IV sahaja" },
      ],
    },
  },
};

export default item;
