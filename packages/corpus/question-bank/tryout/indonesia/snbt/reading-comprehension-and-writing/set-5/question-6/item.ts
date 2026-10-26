import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Contoh foto terbukti menjadi satu-satunya penyebab rata-rata kesepakatan yang lebih tinggi.",
        },
        {
          correct: false,
          label:
            "Setiap pasangan pencatat mengalami peningkatan kesepakatan yang sama.",
        },
        {
          correct: false,
          label: "Nilai awal dan nilai sesi pembanding sama.",
        },
        {
          correct: false,
          label: "Uji tersebut menetapkan tingkat kesepakatan jangka panjang.",
        },
        {
          correct: true,
          label:
            "Rata-rata kesepakatan pada sesi uji lebih tinggi daripada nilai awal dan nilai sesi pembanding.",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
