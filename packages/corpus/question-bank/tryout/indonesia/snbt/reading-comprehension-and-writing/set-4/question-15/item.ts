import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "reading",
    topic: "title",
  },
  stimulus: "rain-gauge",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Musim Hujan di Lembang",
        },
        {
          correct: true,
          label:
            "Penakar Hujan Siswa Mengungkap Penyebab Genangan di Lapangan Sekolah",
        },
        {
          correct: false,
          label: "Cara Membuat Penakar Hujan dari Botol Bekas",
        },
        {
          correct: false,
          label: "Biaya Memperbesar Saluran Air Sekolah",
        },
        {
          correct: false,
          label: "Upacara Sekolah yang Sering Dibatalkan",
        },
      ],
    },
  },
};

export default item;
