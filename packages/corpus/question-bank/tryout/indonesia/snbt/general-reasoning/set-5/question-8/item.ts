import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Sebagian warga Jakarta memiliki akta kelahiran dan KTP",
        },
        {
          isCorrect: false,
          label: "Semua warga Jakarta memiliki akta kelahiran dan KTP",
        },
        {
          isCorrect: false,
          label:
            "Semua warga Jakarta hanya memiliki salah satu dari akta kelahiran atau KTP",
        },
        {
          isCorrect: false,
          label:
            "Ada warga Jakarta di atas $$17$$ tahun tidak memiliki akta kelahiran namun memiliki KTP",
        },
        {
          isCorrect: false,
          label:
            "Sebagian warga Jakarta tidak memiliki akta kelahiran namun mempunyai KTP",
        },
      ],
    },
  },
};

export default item;
