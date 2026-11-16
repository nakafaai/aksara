import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "introduction-to-biology",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "I, III and IV only" },
        { correct: true, label: "II, III and IV only" },
        { correct: false, label: "II and IV only" },
        { correct: false, label: "I and III only" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "I, III dan IV sahaja" },
        { correct: true, label: "II, III dan IV sahaja" },
        { correct: false, label: "II dan IV sahaja" },
        { correct: false, label: "I dan III sahaja" },
      ],
    },
  },
};

export default item;
