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
        { correct: false, label: "I only" },
        { correct: false, label: "I, II, III and IV" },
        { correct: true, label: "I, II and III only" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "I dan II sahaja" },
        { correct: false, label: "I sahaja" },
        { correct: false, label: "I, II, III dan IV" },
        { correct: true, label: "I, II dan III sahaja" },
      ],
    },
  },
};

export default item;
