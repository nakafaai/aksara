import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "data-probability",
    topic: "data",
  },
  stimulus: "bank-queue",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Rata-rata waktu tunggu turun lebih dari $$2$$ menit.",
        },
        {
          column: 1,
          label: "Median waktu tunggu menjadi $$5$$ menit.",
        },
        {
          column: 2,
          label:
            "Median waktu tunggu turun lebih banyak daripada rata-rata waktu tunggu.",
        },
        {
          column: 2,
          label: "Modus waktu tunggu berubah.",
        },
      ],
    },
  },
};

export default item;
