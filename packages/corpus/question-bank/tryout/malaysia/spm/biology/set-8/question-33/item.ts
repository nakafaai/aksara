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
        { correct: true, label: "I, II and III only" },
        { correct: false, label: "II and III only" },
        { correct: false, label: "I, II, III and IV" },
        { correct: false, label: "I and II only" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "I, II dan III sahaja" },
        { correct: false, label: "II dan III sahaja" },
        { correct: false, label: "I, II, III dan IV" },
        { correct: false, label: "I dan II sahaja" },
      ],
    },
  },
};

export default item;
