import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Audit telah selesai.",
        },
        {
          isCorrect: false,
          label: "Audit dibatalkan.",
        },
        {
          isCorrect: false,
          label: "Status audit tidak dapat disimpulkan.",
        },
        {
          isCorrect: true,
          label: "Audit belum selesai.",
        },
        {
          isCorrect: false,
          label: "Audit selesai, tetapi kuota tidak tersedia.",
        },
      ],
    },
  },
};

export default item;
