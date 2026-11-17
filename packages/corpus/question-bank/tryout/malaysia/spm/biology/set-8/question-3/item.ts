import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "movement-of-substances-across-the-plasma-membrane",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "II only" },
        { correct: false, label: "I, II, III and IV" },
        { correct: false, label: "I and IV only" },
        { correct: true, label: "I, II and IV only" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "II sahaja" },
        { correct: false, label: "I, II, III dan IV" },
        { correct: false, label: "I dan IV sahaja" },
        { correct: true, label: "I, II dan IV sahaja" },
      ],
    },
  },
};

export default item;
