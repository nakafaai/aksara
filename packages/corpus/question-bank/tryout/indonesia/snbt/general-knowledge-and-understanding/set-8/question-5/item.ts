import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "word-relation",
    topic: "analogy",
  },
  stimulus: "komodo",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "ikan : air",
        },
        {
          correct: false,
          label: "burung : sarang",
        },
        {
          correct: false,
          label: "ayam : telur",
        },
        {
          correct: true,
          label: "kucing : tikus",
        },
        {
          correct: false,
          label: "petani : sawah",
        },
      ],
    },
  },
};

export default item;
