import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "reading",
    topic: "word-meaning",
  },
  stimulus: "screen-printing",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "tidak dipakai",
        },
        {
          correct: false,
          label: "rusak",
        },
        {
          correct: false,
          label: "dijual",
        },
        {
          correct: false,
          label: "dipinjamkan",
        },
        {
          correct: false,
          label: "dibersihkan",
        },
      ],
    },
  },
};

export default item;
