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
        { correct: true, label: "II, III and IV only" },
        { correct: false, label: "I, II, III and IV" },
        { correct: false, label: "III and IV only" },
        { correct: false, label: "II and III only" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "II, III dan IV sahaja" },
        { correct: false, label: "I, II, III dan IV" },
        { correct: false, label: "III dan IV sahaja" },
        { correct: false, label: "II dan III sahaja" },
      ],
    },
  },
};

export default item;
