import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "descriptive",
    topic: "classification",
  },
  stimulus: "night-market",
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "second-hand books" },
        { correct: false, label: "stalls selling grilled corn" },
        { correct: true, label: "a stall that repairs watches" },
        { correct: false, label: "a small wooden stage" },
      ],
    },
  },
};

export default item;
