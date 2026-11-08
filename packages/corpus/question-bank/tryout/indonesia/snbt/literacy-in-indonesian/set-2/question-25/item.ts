import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "author-purpose",
  },
  stimulus: "subak-water",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Membuktikan bahwa subak sudah ada sejak seribu tahun yang lalu.",
        },
        {
          correct: false,
          label: "Menolak penetapan subak sebagai Warisan Dunia oleh UNESCO.",
        },
        {
          correct: false,
          label: "Menyusun jadwal tanam baru untuk menggantikan jadwal pura.",
        },
        {
          correct: false,
          label:
            "Menunjukkan bahwa varietas unggul lebih tahan hama daripada varietas lama.",
        },
        {
          correct: true,
          label:
            "Menjelaskan secara ilmiah mengapa jadwal pura berhasil menyeimbangkan air dan hama.",
        },
      ],
    },
  },
};

export default item;
