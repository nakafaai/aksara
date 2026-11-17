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
        { correct: false, label: "I and II only" },
        { correct: true, label: "I, II and IV only" },
        { correct: false, label: "II and IV only" },
        { correct: false, label: "I, II, III and IV" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "I dan II sahaja" },
        { correct: true, label: "I, II dan IV sahaja" },
        { correct: false, label: "II dan IV sahaja" },
        { correct: false, label: "I, II, III dan IV" },
      ],
    },
  },
};

export default item;
