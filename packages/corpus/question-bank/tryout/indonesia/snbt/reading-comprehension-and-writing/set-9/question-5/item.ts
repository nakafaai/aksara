import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "reading",
    topic: "word-meaning",
  },
  stimulus: "fire-volunteers",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "memadamkan",
        },
        {
          correct: false,
          label: "memakan makanan dengan rakus",
        },
        {
          correct: true,
          label: "membakar habis",
        },
        {
          correct: false,
          label: "mendekati",
        },
        {
          correct: false,
          label: "menerangi",
        },
      ],
    },
  },
};

export default item;
