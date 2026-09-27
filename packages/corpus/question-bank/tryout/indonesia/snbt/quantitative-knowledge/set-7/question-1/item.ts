import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "(1), (2), dan (3) benar.",
        },
        {
          isCorrect: false,
          label: "(2) dan (4) benar.",
        },
        {
          isCorrect: false,
          label: "Hanya (4) yang benar.",
        },
        {
          isCorrect: false,
          label: "Semua pernyataan benar.",
        },
        {
          isCorrect: true,
          label: "(1) dan (3) benar.",
        },
      ],
    },
  },
};

export default item;
