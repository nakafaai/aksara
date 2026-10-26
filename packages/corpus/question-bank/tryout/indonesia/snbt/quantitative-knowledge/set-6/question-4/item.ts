import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Hanya (1), (2), dan (3) yang benar.",
        },
        {
          correct: false,
          label: "Hanya (2) dan (4) yang benar.",
        },
        {
          correct: false,
          label: "Hanya (4) yang benar.",
        },
        {
          correct: false,
          label: "Semua pernyataan benar.",
        },
        {
          correct: true,
          label: "Hanya (1) dan (3) yang benar.",
        },
      ],
    },
  },
};

export default item;
