import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "(2) dan (4) benar.",
        },
        {
          isCorrect: false,
          label: "(1), (2), dan (3) benar.",
        },
        {
          isCorrect: false,
          label: "(1) dan (3) benar.",
        },
        {
          isCorrect: false,
          label: "(4) saja benar.",
        },
        {
          isCorrect: false,
          label: "Semua pernyataan benar.",
        },
      ],
    },
  },
};

export default item;
