import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

// Date: 2025-11-22
const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Kuantitas $$P$$ lebih besar daripada $$Q$$",
        },
        {
          isCorrect: false,
          label: "Kuantitas $$P$$ sama dengan $$Q$$",
        },
        {
          isCorrect: false,
          label:
            "Tidak dapat ditentukan hubungan antara kuantitas $$P$$ dan $$Q$$",
        },
        {
          isCorrect: false,
          label: "$$P=2Q$$",
        },
        {
          isCorrect: true,
          label: "Kuantitas $$P$$ lebih kecil daripada $$Q$$",
        },
      ],
    },
  },
};

export default item;
