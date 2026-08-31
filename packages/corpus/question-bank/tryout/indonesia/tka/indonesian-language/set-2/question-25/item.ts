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
          isCorrect: true,
          label: "Pola Ketelitian pada Dua Sesi Latihan dengan Urutan Berbeda",
        },
        {
          isCorrect: false,
          label: "Pengaruh Jeda Lima Menit terhadap Ketelitian Dua Belas Siswa",
        },
        {
          isCorrect: false,
          label: "Perbandingan Hasil Dua Paket Latihan dengan dan tanpa Jeda",
        },
        {
          isCorrect: false,
          label: "Ketelitian Belajar setelah Empat Puluh Menit Latihan",
        },
        {
          isCorrect: false,
          label: "Uji Efektivitas Jeda pada Siswa Sekolah Menengah",
        },
      ],
    },
  },
  stimulusKey: "study-breaks",
};

export default item;
