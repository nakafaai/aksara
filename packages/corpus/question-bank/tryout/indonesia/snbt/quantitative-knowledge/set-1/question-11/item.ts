import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Kuantitas $$P$$ lebih kecil daripada $$Q$$",
        },
        {
          correct: false,
          label: "Kuantitas $$P$$ sama dengan $$Q$$",
        },
        {
          correct: false,
          label: "Informasi tidak cukup untuk menentukan hubungan",
        },
        {
          correct: false,
          label: "Kedua kuantitas tidak terdefinisi",
        },
        {
          correct: true,
          label: "Kuantitas $$P$$ lebih besar daripada $$Q$$",
        },
      ],
    },
  },
};

export default item;
