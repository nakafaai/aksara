import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "(1), (2), dan (3) benar.",
        },
        {
          correct: false,
          label: "(2) dan (4) benar.",
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
          label: "(1) dan (3) benar.",
        },
      ],
    },
  },
};

export default item;
