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
        { correct: false, label: "II and IV only" },
        { correct: true, label: "I and IV only" },
        { correct: false, label: "I, III and IV only" },
        { correct: false, label: "I only" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "II dan IV sahaja" },
        { correct: true, label: "I dan IV sahaja" },
        { correct: false, label: "I, III dan IV sahaja" },
        { correct: false, label: "I sahaja" },
      ],
    },
  },
};

export default item;
