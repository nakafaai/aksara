import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Pernyataan (1) saja cukup, tetapi pernyataan (2) saja tidak cukup.",
        },
        {
          isCorrect: false,
          label:
            "Kedua pernyataan cukup jika digunakan bersama-sama, tetapi masing-masing saja tidak cukup.",
        },
        {
          isCorrect: false,
          label: "Setiap pernyataan cukup jika digunakan sendiri.",
        },
        {
          isCorrect: true,
          label:
            "Pernyataan (2) saja cukup, tetapi pernyataan (1) saja tidak cukup.",
        },
        {
          isCorrect: false,
          label:
            "Kedua pernyataan tetap tidak cukup meskipun digunakan bersama-sama.",
        },
      ],
    },
  },
};

export default item;
