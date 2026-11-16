import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "sexual-reproduction-in-flowering-plants",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "II and IV only" },
        { correct: true, label: "I, II and IV only" },
        { correct: false, label: "I, II and III only" },
        { correct: false, label: "III and IV only" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "II dan IV sahaja" },
        { correct: true, label: "I, II dan IV sahaja" },
        { correct: false, label: "I, II dan III sahaja" },
        { correct: false, label: "III dan IV sahaja" },
      ],
    },
  },
};

export default item;
