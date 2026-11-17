import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "response-in-plants",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "I, II and IV only" },
        { correct: false, label: "II, III and IV only" },
        { correct: true, label: "II and IV only" },
        { correct: false, label: "II only" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "I, II dan IV sahaja" },
        { correct: false, label: "II, III dan IV sahaja" },
        { correct: true, label: "II dan IV sahaja" },
        { correct: false, label: "II sahaja" },
      ],
    },
  },
};

export default item;
