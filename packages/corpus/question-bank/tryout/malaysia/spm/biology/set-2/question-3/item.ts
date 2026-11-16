import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "movement-of-substances-across-the-plasma-membrane",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "I, III and IV only" },
        { correct: false, label: "II and III only" },
        { correct: false, label: "I and II only" },
        { correct: true, label: "I and III only" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "I, III dan IV sahaja" },
        { correct: false, label: "II dan III sahaja" },
        { correct: false, label: "I dan II sahaja" },
        { correct: true, label: "I dan III sahaja" },
      ],
    },
  },
};

export default item;
