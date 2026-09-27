import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "Buku tulis" },
        { isCorrect: false, label: "Bolpoin" },
        {
          isCorrect: false,
          label: "Buku tulis dan pensil",
        },
        {
          isCorrect: false,
          label: "Semua memberikan keuntungan sama",
        },
        { isCorrect: true, label: "Pensil" },
      ],
    },
  },
};

export default item;
