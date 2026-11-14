import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "word-relation",
    topic: "antonym",
  },
  stimulus: "purnama",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "samar" },
        { correct: true, label: "semu" },
        { correct: false, label: "gaib" },
        { correct: false, label: "kabur" },
        { correct: false, label: "kecil" },
      ],
    },
  },
};

export default item;
