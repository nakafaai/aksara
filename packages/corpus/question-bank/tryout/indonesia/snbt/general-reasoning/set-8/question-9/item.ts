import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Mahasiswa yang tidak meraih nilai ujian tinggi tidak mengatur waktunya dengan baik.",
        },
        {
          correct: false,
          label:
            "Mahasiswa yang mengatur waktunya dengan baik tidak meraih nilai ujian tinggi.",
        },
        {
          correct: false,
          label:
            "Setiap mahasiswa yang belajar secara konsisten pasti mengatur waktunya dengan baik.",
        },
        {
          correct: false,
          label:
            "Nilai ujian tinggi menjamin bahwa mahasiswa belajar secara konsisten.",
        },
        {
          correct: false,
          label:
            "Pengaturan waktu yang buruk menjamin mahasiswa meraih nilai ujian tinggi.",
        },
      ],
    },
  },
};

export default item;
