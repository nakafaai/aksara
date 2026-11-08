import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "inductive-reasoning",
    topic: "inference",
  },
  stimulus: "pagar",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Persentase selisih kadar PM2,5 antara trotoar berpagar tanaman dan trotoar tanpa pemisah lebih besar pada hari berangin lemah daripada pada hari berangin kencang.",
        },
        {
          column: 1,
          label:
            "Pada hari berangin kencang, kadar PM2,5 di trotoar berpagar tanaman masih lebih rendah daripada di trotoar tanpa pemisah.",
        },
        {
          column: 2,
          label:
            "Pagar tanaman membuat udara di lajur kendaraan lebih bersih pada semua ruas berpagar.",
        },
        {
          column: 2,
          label:
            "Penelitian menunjukkan bahwa pagar tanaman yang lebih tinggi dari $$1{,}5$$ meter memberikan hasil yang lebih baik.",
        },
      ],
    },
  },
};

export default item;
