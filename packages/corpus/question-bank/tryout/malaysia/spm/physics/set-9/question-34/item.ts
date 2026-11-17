import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "form-5",
    topic: "electromagnetism",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "I and II only" },
        { correct: true, label: "I, II and IV only" },
        { correct: false, label: "II, III and IV only" },
        { correct: false, label: "III and IV only" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "I dan II sahaja" },
        { correct: true, label: "I, II dan IV sahaja" },
        { correct: false, label: "II, III dan IV sahaja" },
        { correct: false, label: "III dan IV sahaja" },
      ],
    },
  },
};

export default item;
