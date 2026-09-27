import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Kartu pertanyaan terbukti menjadi satu-satunya penyebab rata-rata yang lebih tinggi.",
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
            "Uji tersebut menetapkan hasil jangka panjang untuk seluruh tur laboratorium.",
        },
        {
          isCorrect: true,
          label:
            "Rata-rata pengunjung yang bertanya pada sesi uji melebihi rata-rata awal dan pembanding.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
