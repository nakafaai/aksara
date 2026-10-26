import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Rata-rata penyelesaian rute pada sesi uji lebih tinggi daripada rata-rata awal dan pembanding.",
        },
        {
          correct: false,
          label:
            "Panah terbukti menjadi satu-satunya penyebab rata-rata penyelesaian yang lebih tinggi.",
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
            "Uji tersebut menetapkan hasil jangka panjang untuk semua pameran.",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
