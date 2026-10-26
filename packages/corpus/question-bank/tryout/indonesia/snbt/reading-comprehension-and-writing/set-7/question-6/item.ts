import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Pemesanan awal terbukti menjadi satu-satunya penyebab rata-rata yang lebih tinggi.",
        },
        {
          correct: false,
          label: "Setiap siswa mengalami peningkatan yang sama.",
        },
        {
          correct: false,
          label: "Rata-rata awal dan pembanding sama.",
        },
        {
          correct: true,
          label:
            "Rata-rata porsi yang diambil sesuai pesanan pada sesi uji melebihi rata-rata awal dan pembanding.",
        },
        {
          correct: false,
          label:
            "Uji tersebut menetapkan hasil jangka panjang bagi semua program sarapan.",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
