import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "data-inference",
  },
  stimulus: "perpustakaan",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Jumlah buku yang dipinjam pada bulan Juni naik di keempat desa tanpa kecuali.",
        },
        {
          correct: true,
          label:
            "Pengunjung bertambah, tetapi rata-rata buku yang dipinjam setiap pengunjung berkurang.",
        },
        {
          correct: false,
          label:
            "Desa dengan pengunjung terbanyak pada Juni juga meminjam buku paling banyak pada Juni.",
        },
        {
          correct: false,
          label:
            "Kenaikan jumlah pengunjung dari Januari ke Juni paling besar terjadi di Desa Cibeber.",
        },
        {
          correct: false,
          label:
            "Jumlah buku yang dipinjam di keempat desa naik lebih dari 25% dari Januari ke Juni.",
        },
      ],
    },
  },
};

export default item;
