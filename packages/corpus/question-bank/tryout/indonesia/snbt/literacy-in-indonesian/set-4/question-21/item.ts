import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "regional-language",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Di sekolah-sekolah kota, banyak murid berbahasa ibu yang berbeda dari bahasa daerah provinsi.",
        },
        {
          correct: false,
          label:
            "Sebagian besar murid di desa-desa provinsi itu berbahasa daerah yang sama di rumah.",
        },
        {
          correct: false,
          label:
            "Guru bahasa daerah di provinsi itu jumlahnya sudah mencukupi untuk semua sekolah.",
        },
        {
          correct: false,
          label:
            "Murid yang belajar bahasa daerah memperoleh nilai bahasa Indonesia yang lebih baik.",
        },
        {
          correct: false,
          label:
            "Cerita rakyat lebih mudah direkam dengan telepon genggam daripada dengan buku.",
        },
      ],
    },
  },
};

export default item;
