import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "(2) dan (4) benar.",
        },
        {
          correct: false,
          label: "(1), (2), dan (3) benar.",
        },
        {
          correct: false,
          label: "(1) dan (3) benar.",
        },
        {
          correct: false,
          label: "(4) saja benar.",
        },
        {
          correct: false,
          label: "Semua pernyataan benar.",
        },
      ],
    },
  },
};

export default item;
