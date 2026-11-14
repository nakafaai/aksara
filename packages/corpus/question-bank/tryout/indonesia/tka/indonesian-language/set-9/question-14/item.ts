import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "language-suitability",
  },
  stimulus: "silat-club",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Dalam dua tahun, anggota ekstrakurikuler pencak silat naik dari 25 menjadi 70 siswa.",
        },
        { correct: false, label: "Semua siswa SMP itu kini menjadi pesilat." },
        {
          correct: false,
          label: "Anggota pencak silat bertambah 70 siswa dalam dua tahun.",
        },
        {
          correct: false,
          label: "Pencak silat adalah olahraga terbaik di dunia.",
        },
        {
          correct: false,
          label: "Anggota pencak silat turun karena lapangan latihan sempit.",
        },
      ],
    },
  },
};

export default item;
