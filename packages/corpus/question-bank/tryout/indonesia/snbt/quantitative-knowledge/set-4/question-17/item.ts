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
            "Kedua pernyataan cukup jika digunakan bersama-sama, tetapi masing-masing saja tidak cukup.",
        },
        {
          correct: false,
          label: "Setiap pernyataan cukup jika digunakan sendiri.",
        },
        {
          correct: true,
          label:
            "Pernyataan (2) saja cukup, tetapi pernyataan (1) saja tidak cukup.",
        },
        {
          correct: false,
          label:
            "Kedua pernyataan tetap tidak cukup meskipun digunakan bersama-sama.",
        },
      ],
    },
  },
};

export default item;
