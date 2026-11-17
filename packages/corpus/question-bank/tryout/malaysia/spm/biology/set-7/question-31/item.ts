import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "environmental-sustainability",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "III only" },
        { correct: false, label: "I, II and III only" },
        { correct: true, label: "II and III only" },
        { correct: false, label: "II, III and IV only" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "III sahaja" },
        { correct: false, label: "I, II dan III sahaja" },
        { correct: true, label: "II dan III sahaja" },
        { correct: false, label: "II, III dan IV sahaja" },
      ],
    },
  },
};

export default item;
