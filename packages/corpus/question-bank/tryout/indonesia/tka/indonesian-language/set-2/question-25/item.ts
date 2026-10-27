import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "language-suitability",
  },
  stimulus: "study-breaks",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Perbandingan Hasil Dua Paket Latihan dengan dan tanpa Jeda",
        },
        {
          correct: false,
          label: "Pengaruh Jeda Lima Menit terhadap Ketelitian Dua Belas Siswa",
        },
        {
          correct: false,
          label: "Pola Ketelitian pada Dua Sesi Latihan dengan Urutan Berbeda",
        },
        {
          correct: false,
          label: "Ketelitian Belajar setelah Empat Puluh Menit Latihan",
        },
        {
          correct: false,
          label: "Uji Efektivitas Jeda pada Siswa Sekolah Menengah",
        },
      ],
    },
  },
};

export default item;
