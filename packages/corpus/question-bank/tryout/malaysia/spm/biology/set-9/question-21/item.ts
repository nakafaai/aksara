import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "plant-tissue-organisation-and-growth",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "I, II and III only" },
        { correct: false, label: "I and III only" },
        { correct: false, label: "II and IV only" },
        { correct: false, label: "I, III and IV only" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "I, II dan III sahaja" },
        { correct: false, label: "I dan III sahaja" },
        { correct: false, label: "II dan IV sahaja" },
        { correct: false, label: "I, III dan IV sahaja" },
      ],
    },
  },
};

export default item;
