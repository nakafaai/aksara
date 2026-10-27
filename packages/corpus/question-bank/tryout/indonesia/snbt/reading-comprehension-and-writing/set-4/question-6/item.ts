import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Label foto terbukti menyebabkan kenaikan rata-rata alat yang dikembalikan dengan tepat.",
        },
        {
          correct: false,
          label: "Setiap peminjam mengalami peningkatan yang sama.",
        },
        {
          correct: true,
          label:
            "Rata-rata pengembalian yang tepat pada sesi uji melebihi rata-rata awal dan sesi pembanding.",
        },
        {
          correct: false,
          label: "Rata-rata awal dan rata-rata sesi pembanding sama.",
        },
        {
          correct: false,
          label: "Uji singkat memastikan hasil jangka panjang.",
        },
      ],
    },
  },
};

export default item;
