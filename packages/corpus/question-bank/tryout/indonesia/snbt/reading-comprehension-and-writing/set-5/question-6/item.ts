import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "reading",
    topic: "word-meaning",
  },
  stimulus: "goat-milk",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "memeras",
        },
        {
          correct: true,
          label: "menerima dan mengumpulkan",
        },
        {
          correct: false,
          label: "menyaring",
        },
        {
          correct: false,
          label: "menjual kembali",
        },
        {
          correct: false,
          label: "membagikan",
        },
      ],
    },
  },
};

export default item;
