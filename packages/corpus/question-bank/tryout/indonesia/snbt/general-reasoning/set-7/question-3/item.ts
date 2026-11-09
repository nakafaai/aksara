import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "inductive-reasoning",
    topic: "data-comparison",
  },
  stimulus: "burung",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Banyak jenis burung di Taman Kenanga bertambah lebih banyak pada 2025 daripada pada 2024.",
        },
        {
          column: 1,
          label:
            "Pada akhir 2025, Taman Kenanga memiliki $$5$$ jenis burung lebih banyak daripada Taman Melati.",
        },
        {
          column: 2,
          label:
            "Banyak jenis burung di Taman Melati tidak berubah selama ketiga pencatatan.",
        },
        {
          column: 1,
          label:
            "Banyak jenis burung di Taman Kenanga dari awal 2024 sampai akhir 2025 naik lebih dari $$80\\%$$.",
        },
      ],
    },
  },
};

export default item;
