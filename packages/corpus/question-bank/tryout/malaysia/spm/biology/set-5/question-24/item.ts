import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "transport-in-plants",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "I, II and III only" },
        { correct: false, label: "III and IV only" },
        { correct: false, label: "I and II only" },
        { correct: true, label: "II and III only" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "I, II dan III sahaja" },
        { correct: false, label: "III dan IV sahaja" },
        { correct: false, label: "I dan II sahaja" },
        { correct: true, label: "II dan III sahaja" },
      ],
    },
  },
};

export default item;
