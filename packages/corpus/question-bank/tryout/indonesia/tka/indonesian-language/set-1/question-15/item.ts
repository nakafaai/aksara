import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "language-suitability",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Kebun belakang adalah tempat terbaik di dunia.",
        },
        {
          isCorrect: false,
          label: "Semua siswa pasti menyukai bangku yang baru.",
        },
        {
          isCorrect: true,
          label:
            "Lima hari pengukuran belum mewakili seluruh musim dan kondisi cuaca.",
        },
        {
          isCorrect: false,
          label: "Pohon selalu bekerja lebih baik daripada kipas.",
        },
        {
          isCorrect: false,
          label: "Angka pada tabel tidak perlu diperiksa lagi.",
        },
      ],
    },
  },
  stimulusKey: "heat-map",
};

export default item;
