import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "movement-of-substances-across-the-plasma-membrane",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "I and II only" },
        { correct: true, label: "I, II and III only" },
        { correct: false, label: "I, II, III and IV" },
        { correct: false, label: "III only" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "I dan II sahaja" },
        { correct: true, label: "I, II dan III sahaja" },
        { correct: false, label: "I, II, III dan IV" },
        { correct: false, label: "III sahaja" },
      ],
    },
  },
};

export default item;
