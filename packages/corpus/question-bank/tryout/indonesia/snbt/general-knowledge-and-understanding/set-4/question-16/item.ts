import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "vocabulary",
    topic: "word-meaning",
  },
  stimulus: "puter",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "memancarkan",
        },
        {
          correct: false,
          label: "menolak",
        },
        {
          correct: true,
          label: "mengambil",
        },
        {
          correct: false,
          label: "menghasilkan",
        },
        {
          correct: false,
          label: "menaikkan",
        },
      ],
    },
  },
};

export default item;
