import type { ItemSource } from "#corpus/question-bank/item";

// Date: 2025-11-22
const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Kuantitas $$P$$ lebih besar daripada $$Q$$",
        },
        {
          correct: false,
          label: "Kuantitas $$P$$ sama dengan $$Q$$",
        },
        {
          correct: false,
          label:
            "Tidak dapat ditentukan hubungan antara kuantitas $$P$$ dan $$Q$$",
        },
        {
          correct: false,
          label: "$$P=2Q$$",
        },
        {
          correct: true,
          label: "Kuantitas $$P$$ lebih kecil daripada $$Q$$",
        },
      ],
    },
  },
};

export default item;
