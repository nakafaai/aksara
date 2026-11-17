import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "plant-tissue-organisation-and-growth",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "I and II only" },
        { correct: false, label: "III only" },
        { correct: false, label: "I, III and IV only" },
        { correct: true, label: "I and III only" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "I dan II sahaja" },
        { correct: false, label: "III sahaja" },
        { correct: false, label: "I, III dan IV sahaja" },
        { correct: true, label: "I dan III sahaja" },
      ],
    },
  },
};

export default item;
