import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Rata-rata penyelesaian rute pada sesi uji lebih tinggi daripada rata-rata awal dan pembanding.",
        },
        {
          isCorrect: false,
          label:
            "Panah terbukti menjadi satu-satunya penyebab rata-rata penyelesaian yang lebih tinggi.",
        },
        {
          isCorrect: false,
          label: "Setiap pengunjung mengalami peningkatan yang sama.",
        },
        {
          isCorrect: false,
          label: "Rata-rata awal dan pembanding sama.",
        },
        {
          isCorrect: false,
          label:
            "Uji tersebut menetapkan hasil jangka panjang untuk semua pameran.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
