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
            "Kedua pernyataan bersama-sama cukup, tetapi masing-masing pernyataan saja tidak cukup.",
        },
        {
          isCorrect: true,
          label:
            "Pernyataan (2) saja cukup, tetapi pernyataan (1) saja tidak cukup.",
        },
        {
          isCorrect: false,
          label:
            "Pernyataan (1) saja sudah cukup, dan pernyataan (2) saja sudah cukup.",
        },
        {
          isCorrect: false,
          label: "Pernyataan (1) dan (2) bersama-sama tidak cukup.",
        },
      ],
    },
  },
};

export default item;
