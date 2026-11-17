import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "sexual-reproduction-in-flowering-plants",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "II only" },
        { correct: true, label: "I and II only" },
        { correct: false, label: "I, II and III only" },
        { correct: false, label: "I, II and IV only" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "II sahaja" },
        { correct: true, label: "I dan II sahaja" },
        { correct: false, label: "I, II dan III sahaja" },
        { correct: false, label: "I, II dan IV sahaja" },
      ],
    },
  },
};

export default item;
