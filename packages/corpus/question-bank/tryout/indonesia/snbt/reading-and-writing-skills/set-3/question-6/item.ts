import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Simbol baru terbukti menyebabkan rata-rata hasil uji yang lebih tinggi.",
        },
        {
          isCorrect: false,
          label: "Setiap peserta mengalami peningkatan yang sama.",
        },
        {
          isCorrect: false,
          label: "Uji singkat tersebut membuktikan hasil jangka panjang.",
        },
        {
          isCorrect: false,
          label: "Rata-rata awal dan rata-rata pembanding sama.",
        },
        {
          isCorrect: true,
          label:
            "Rata-rata hasil uji lebih tinggi daripada rata-rata awal dan pembanding.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
