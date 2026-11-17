import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "biodiversity",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "I, II and IV only" },
        { correct: false, label: "I, II, III and IV" },
        { correct: false, label: "I and IV only" },
        { correct: false, label: "II and IV only" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "I, II dan IV sahaja" },
        { correct: false, label: "I, II, III dan IV" },
        { correct: false, label: "I dan IV sahaja" },
        { correct: false, label: "II dan IV sahaja" },
      ],
    },
  },
};

export default item;
