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
        { correct: false, label: "I, II and IV only" },
        { correct: false, label: "I, III and IV only" },
        { correct: false, label: "II and III only" },
        { correct: true, label: "I and II only" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "I, II dan IV sahaja" },
        { correct: false, label: "I, III dan IV sahaja" },
        { correct: false, label: "II dan III sahaja" },
        { correct: true, label: "I dan II sahaja" },
      ],
    },
  },
};

export default item;
