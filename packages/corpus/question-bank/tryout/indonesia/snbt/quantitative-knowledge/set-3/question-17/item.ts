import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Pernyataan (1), (2), dan (3) benar",
        },
        {
          isCorrect: true,
          label: "Pernyataan (2) dan (4) benar",
        },
        {
          isCorrect: false,
          label: "Pernyataan (1) dan (3) benar",
        },
        {
          isCorrect: false,
          label: "Hanya pernyataan (4) yang benar",
        },
        {
          isCorrect: false,
          label: "Semua pernyataan benar",
        },
      ],
    },
  },
};

export default item;
