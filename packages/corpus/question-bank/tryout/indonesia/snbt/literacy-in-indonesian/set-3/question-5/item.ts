import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "wolbachia-mosquito",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Perlindungan baru dapat diharapkan setelah populasi nyamuk lokal dimusnahkan, dan soal pengganti pemberantasan sarang tidak diuji oleh rancangan AWED.",
        },
        {
          correct: false,
          label:
            "Perlindungan baru dapat diharapkan setelah proporsi nyamuk ber-Wolbachia tinggi, dan uji AWED membuktikan bahwa kedua cara harus selalu dipakai bersama.",
        },
        {
          correct: false,
          label:
            "Efikasi di Yogyakarta kemungkinan terlalu tinggi karena nyamuk menyeberang batas klaster, dan soal pengganti pemberantasan sarang tidak diuji oleh rancangan AWED.",
        },
        {
          correct: true,
          label:
            "Perlindungan baru dapat diharapkan setelah proporsi nyamuk ber-Wolbachia tinggi, dan soal pengganti pemberantasan sarang tidak diuji oleh rancangan AWED.",
        },
        {
          correct: false,
          label:
            "Perlindungan baru dapat diharapkan setelah proporsi nyamuk ber-Wolbachia tinggi, dan nyamuk ber-Wolbachia harus dilepas ulang setiap tahun agar bertahan.",
        },
      ],
    },
  },
};

export default item;
