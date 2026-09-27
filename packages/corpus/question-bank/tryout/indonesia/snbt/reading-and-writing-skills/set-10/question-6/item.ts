import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Susunan bahan terbukti menjadi satu-satunya penyebab nilai yang lebih tinggi.",
        },
        {
          isCorrect: true,
          label:
            "Nilai kelompok yang selesai sebelum batas waktu pada pertemuan uji melebihi nilai awal dan pembanding.",
        },
        {
          isCorrect: false,
          label: "Setiap peserta mengalami peningkatan yang sama.",
        },
        {
          isCorrect: false,
          label: "Nilai awal dan pembanding sama.",
        },
        {
          isCorrect: false,
          label:
            "Uji singkat itu menetapkan hasil jangka panjang bagi semua kelas memasak.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
