import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "reading",
    topic: "word-meaning",
  },
  stimulus: "mangrove-nursery",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "membalikkan",
        },
        {
          correct: false,
          label: "menenggelamkan",
        },
        {
          correct: false,
          label: "menghentikan sama sekali",
        },
        {
          correct: false,
          label: "membelokkan",
        },
        {
          correct: true,
          label: "mengurangi",
        },
      ],
    },
  },
};

export default item;
