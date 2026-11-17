import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "introduction-to-biology",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "I and III only" },
        { correct: false, label: "I, II and IV only" },
        { correct: false, label: "II and IV only" },
        { correct: true, label: "I and IV only" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "I dan III sahaja" },
        { correct: false, label: "I, II dan IV sahaja" },
        { correct: false, label: "II dan IV sahaja" },
        { correct: true, label: "I dan IV sahaja" },
      ],
    },
  },
};

export default item;
