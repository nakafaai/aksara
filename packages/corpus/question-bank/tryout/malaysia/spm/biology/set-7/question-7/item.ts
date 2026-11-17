import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "metabolism-and-enzymes",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "I and IV only" },
        { correct: false, label: "II and IV only" },
        { correct: false, label: "III and IV only" },
        { correct: true, label: "II, III and IV only" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "I dan IV sahaja" },
        { correct: false, label: "II dan IV sahaja" },
        { correct: false, label: "III dan IV sahaja" },
        { correct: true, label: "II, III dan IV sahaja" },
      ],
    },
  },
};

export default item;
