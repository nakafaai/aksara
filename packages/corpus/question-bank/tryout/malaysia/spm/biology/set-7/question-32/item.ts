import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "inheritance",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "II only" },
        { correct: true, label: "II and III only" },
        { correct: false, label: "II, III and IV only" },
        { correct: false, label: "I and II only" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "II sahaja" },
        { correct: true, label: "II dan III sahaja" },
        { correct: false, label: "II, III dan IV sahaja" },
        { correct: false, label: "I dan II sahaja" },
      ],
    },
  },
};

export default item;
