import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Kuantitas $$P$$ lebih kecil daripada $$Q$$",
        },
        {
          isCorrect: false,
          label: "Kuantitas $$P$$ sama dengan $$Q$$",
        },
        {
          isCorrect: false,
          label: "Informasi tidak cukup untuk menentukan hubungan",
        },
        {
          isCorrect: false,
          label: "Kedua kuantitas tidak terdefinisi",
        },
        {
          isCorrect: true,
          label: "Kuantitas $$P$$ lebih besar daripada $$Q$$",
        },
      ],
    },
  },
};

export default item;
