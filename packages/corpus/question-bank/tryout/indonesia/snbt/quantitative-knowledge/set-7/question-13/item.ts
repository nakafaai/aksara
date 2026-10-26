import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Pernyataan (1) saja cukup, tetapi pernyataan (2) saja tidak cukup.",
        },
        {
          correct: false,
          label:
            "Kedua pernyataan bersama-sama cukup, tetapi masing-masing pernyataan saja tidak cukup.",
        },
        {
          correct: true,
          label:
            "Pernyataan (2) saja cukup, tetapi pernyataan (1) saja tidak cukup.",
        },
        {
          correct: false,
          label:
            "Pernyataan (1) saja sudah cukup, dan pernyataan (2) saja sudah cukup.",
        },
        {
          correct: false,
          label: "Pernyataan (1) dan (2) bersama-sama tidak cukup.",
        },
      ],
    },
  },
};

export default item;
