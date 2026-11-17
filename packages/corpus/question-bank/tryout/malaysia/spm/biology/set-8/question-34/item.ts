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
        { correct: false, label: "IV only" },
        { correct: false, label: "I, II and IV only" },
        { correct: true, label: "I and IV only" },
        { correct: false, label: "I, III and IV only" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "IV sahaja" },
        { correct: false, label: "I, II dan IV sahaja" },
        { correct: true, label: "I dan IV sahaja" },
        { correct: false, label: "I, III dan IV sahaja" },
      ],
    },
  },
};

export default item;
