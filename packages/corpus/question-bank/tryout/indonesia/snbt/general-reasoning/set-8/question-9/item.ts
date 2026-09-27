import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Mahasiswa yang tidak meraih nilai ujian tinggi tidak mengatur waktunya dengan baik.",
        },
        {
          isCorrect: false,
          label:
            "Mahasiswa yang mengatur waktunya dengan baik tidak meraih nilai ujian tinggi.",
        },
        {
          isCorrect: false,
          label:
            "Setiap mahasiswa yang belajar secara konsisten pasti mengatur waktunya dengan baik.",
        },
        {
          isCorrect: false,
          label:
            "Nilai ujian tinggi menjamin bahwa mahasiswa belajar secara konsisten.",
        },
        {
          isCorrect: false,
          label:
            "Pengaturan waktu yang buruk menjamin mahasiswa meraih nilai ujian tinggi.",
        },
      ],
    },
  },
};

export default item;
