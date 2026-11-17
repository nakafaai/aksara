import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "form-4",
    topic: "waves",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "I and III only" },
        { correct: true, label: "I, III and IV only" },
        { correct: false, label: "I, II and III only" },
        { correct: false, label: "II, III and IV only" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "I dan III sahaja" },
        { correct: true, label: "I, III dan IV sahaja" },
        { correct: false, label: "I, II dan III sahaja" },
        { correct: false, label: "II, III dan IV sahaja" },
      ],
    },
  },
};

export default item;
