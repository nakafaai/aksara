import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "word-relation",
    topic: "antonym",
  },
  stimulus: "sidat",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "puncak",
        },
        {
          correct: false,
          label: "mata air",
        },
        {
          correct: false,
          label: "tepian",
        },
        {
          correct: true,
          label: "hilir",
        },
        {
          correct: false,
          label: "dasar",
        },
      ],
    },
  },
};

export default item;
