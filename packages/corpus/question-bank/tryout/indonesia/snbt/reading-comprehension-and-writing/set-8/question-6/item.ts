import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Kartu pertanyaan terbukti menjadi satu-satunya penyebab rata-rata yang lebih tinggi.",
        },
        {
          correct: false,
          label: "Setiap pengunjung mengalami peningkatan yang sama.",
        },
        {
          correct: false,
          label: "Rata-rata awal dan pembanding sama.",
        },
        {
          correct: false,
          label:
            "Uji tersebut menetapkan hasil jangka panjang untuk seluruh tur laboratorium.",
        },
        {
          correct: true,
          label:
            "Rata-rata pengunjung yang bertanya pada sesi uji melebihi rata-rata awal dan pembanding.",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
