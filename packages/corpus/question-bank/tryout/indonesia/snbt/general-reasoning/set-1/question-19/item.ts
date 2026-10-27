import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Makanan pendamping umumnya mulai diberikan sekitar usia $$6$$ bulan.",
        },
        {
          correct: false,
          label:
            "Pemberian ASI dapat dilanjutkan setelah makanan pendamping mulai diberikan.",
        },
        {
          correct: false,
          label: "Makanan pendamping harus cukup, aman, dan padat gizi.",
        },
        {
          correct: false,
          label:
            "Buah dan sayuran merupakan bagian dari makanan pendamping yang beragam.",
        },
        {
          correct: true,
          label:
            "Sayuran saja menyediakan seluruh kelompok makanan yang dibutuhkan bayi setelah usia $$6$$ bulan.",
        },
      ],
    },
  },
};

export default item;
