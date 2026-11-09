import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "vocabulary",
    topic: "word-meaning",
  },
  stimulus: "biopori",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "secara teratur pada waktu tertentu",
        },
        {
          correct: false,
          label: "sekali saja ketika lubang dibuat",
        },
        {
          correct: false,
          label: "tanpa aturan dan sesuka hati",
        },
        {
          correct: false,
          label: "hanya ketika lubang sudah penuh air hujan",
        },
        {
          correct: false,
          label: "secara bersamaan oleh semua warga",
        },
      ],
    },
  },
};

export default item;
