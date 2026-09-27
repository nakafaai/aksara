import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Makanan pendamping umumnya mulai diberikan sekitar usia $$6$$ bulan.",
        },
        {
          isCorrect: false,
          label:
            "Pemberian ASI dapat dilanjutkan setelah makanan pendamping mulai diberikan.",
        },
        {
          isCorrect: false,
          label: "Makanan pendamping harus cukup, aman, dan padat gizi.",
        },
        {
          isCorrect: false,
          label:
            "Buah dan sayuran merupakan bagian dari makanan pendamping yang beragam.",
        },
        {
          isCorrect: true,
          label:
            "Sayuran saja menyediakan seluruh kelompok makanan yang dibutuhkan bayi setelah usia $$6$$ bulan.",
        },
      ],
    },
  },
};

export default item;
