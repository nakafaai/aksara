import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "cell-biology-and-organisation",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "I and IV only" },
        { correct: false, label: "II, III and IV only" },
        { correct: false, label: "I, II, III and IV" },
        { correct: true, label: "I, II and IV only" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "I dan IV sahaja" },
        { correct: false, label: "II, III dan IV sahaja" },
        { correct: false, label: "I, II, III dan IV" },
        { correct: true, label: "I, II dan IV sahaja" },
      ],
    },
  },
};

export default item;
