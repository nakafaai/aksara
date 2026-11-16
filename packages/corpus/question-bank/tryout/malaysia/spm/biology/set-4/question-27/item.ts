import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "adaptations-of-plants-in-different-habitats",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "I, II and III only" },
        { correct: false, label: "I and IV only" },
        { correct: true, label: "I and II only" },
        { correct: false, label: "II and III only" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "I, II dan III sahaja" },
        { correct: false, label: "I dan IV sahaja" },
        { correct: true, label: "I dan II sahaja" },
        { correct: false, label: "II dan III sahaja" },
      ],
    },
  },
};

export default item;
