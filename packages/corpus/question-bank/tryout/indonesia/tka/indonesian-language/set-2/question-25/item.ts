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
          label: "Jeda Lima Menit Pasti Menghapus Semua Kesalahan",
        },
        {
          isCorrect: false,
          label: "Rahasia Medis agar Selalu Mendapat Nilai Sempurna",
        },
        {
          isCorrect: true,
          label: "Pola Ketelitian pada Dua Sesi Latihan dengan Urutan Berbeda",
        },
        {
          isCorrect: false,
          label: "Bukti bahwa Belajar Empat Puluh Menit Berbahaya",
        },
        {
          isCorrect: false,
          label: "Dua Belas Siswa Menentukan Cara Belajar Nasional",
        },
      ],
    },
  },
  stimulusKey: "study-breaks",
};

export default item;
