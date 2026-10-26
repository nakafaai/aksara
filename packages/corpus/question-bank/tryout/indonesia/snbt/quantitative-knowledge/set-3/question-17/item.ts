import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Pernyataan (1), (2), dan (3) benar",
        },
        {
          correct: true,
          label: "Pernyataan (2) dan (4) benar",
        },
        {
          correct: false,
          label: "Pernyataan (1) dan (3) benar",
        },
        {
          correct: false,
          label: "Hanya pernyataan (4) yang benar",
        },
        {
          correct: false,
          label: "Semua pernyataan benar",
        },
      ],
    },
  },
};

export default item;
