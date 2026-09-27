import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "(1), (2), dan (3) SAJA yang benar",
        },
        {
          isCorrect: false,
          label: "(1) dan (3) SAJA yang benar",
        },
        {
          isCorrect: false,
          label: "(2) dan (4) SAJA yang benar",
        },
        {
          isCorrect: false,
          label: "SEMUA pernyataan benar",
        },
        {
          isCorrect: false,
          label: "SEMUA pernyataan salah",
        },
      ],
    },
  },
};

export default item;
