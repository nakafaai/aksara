import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Simbol baru terbukti menyebabkan rata-rata hasil uji yang lebih tinggi.",
        },
        {
          correct: false,
          label: "Setiap peserta mengalami peningkatan yang sama.",
        },
        {
          correct: false,
          label: "Uji singkat tersebut membuktikan hasil jangka panjang.",
        },
        {
          correct: false,
          label: "Rata-rata awal dan rata-rata pembanding sama.",
        },
        {
          correct: true,
          label:
            "Rata-rata hasil uji lebih tinggi daripada rata-rata awal dan pembanding.",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
