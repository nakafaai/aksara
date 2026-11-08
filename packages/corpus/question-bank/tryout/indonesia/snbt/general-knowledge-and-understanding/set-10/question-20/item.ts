import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "vocabulary",
    topic: "word-meaning",
  },
  stimulus: "kunang",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "menyerap",
        },
        {
          correct: false,
          label: "memantulkan",
        },
        {
          correct: true,
          label: "mengeluarkan",
        },
        {
          correct: false,
          label: "memadamkan",
        },
        {
          correct: false,
          label: "mengumpulkan",
        },
      ],
    },
  },
};

export default item;
