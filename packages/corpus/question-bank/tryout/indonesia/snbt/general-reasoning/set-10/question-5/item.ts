import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "inductive-reasoning",
    topic: "data-comparison",
  },
  stimulus: "perpustakaan",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label: "Pengunjung di Desa Pasirjaya naik lebih dari 80%.",
        },
        {
          column: 2,
          label:
            "Pada bulan Juni, setiap desa meminjam lebih banyak buku daripada jumlah pengunjungnya.",
        },
        {
          column: 1,
          label: "Total pengunjung keempat desa naik 70 orang.",
        },
        {
          column: 1,
          label:
            "Di Desa Mekarsari, jumlah pengunjung tetap, tetapi buku yang dipinjam berkurang.",
        },
      ],
    },
  },
};

export default item;
