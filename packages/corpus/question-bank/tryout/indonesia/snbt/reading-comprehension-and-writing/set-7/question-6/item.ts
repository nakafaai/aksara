import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Pemesanan awal terbukti menjadi satu-satunya penyebab rata-rata yang lebih tinggi.",
        },
        {
          isCorrect: false,
          label: "Setiap siswa mengalami peningkatan yang sama.",
        },
        {
          isCorrect: false,
          label: "Rata-rata awal dan pembanding sama.",
        },
        {
          isCorrect: true,
          label:
            "Rata-rata porsi yang diambil sesuai pesanan pada sesi uji melebihi rata-rata awal dan pembanding.",
        },
        {
          isCorrect: false,
          label:
            "Uji tersebut menetapkan hasil jangka panjang bagi semua program sarapan.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
