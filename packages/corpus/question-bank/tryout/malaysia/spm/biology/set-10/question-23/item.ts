import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "nutrition-in-plants",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "I, II and IV only" },
        { correct: false, label: "II, III and IV only" },
        { correct: false, label: "I and III only" },
        { correct: true, label: "II and IV only" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "I, II dan IV sahaja" },
        { correct: false, label: "II, III dan IV sahaja" },
        { correct: false, label: "I dan III sahaja" },
        { correct: true, label: "II dan IV sahaja" },
      ],
    },
  },
};

export default item;
