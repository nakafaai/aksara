import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "lingua-franca",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Bahasa Melayu sudah dipakai untuk tulisan di wilayah ini sejak abad ketujuh, dan bahasa Indonesia sekarang sama persis dengan bahasa prasasti itu.",
        },
        {
          correct: false,
          label:
            "Semua penduduk Sriwijaya berbahasa ibu Melayu, karena prasasti kerajaannya ditulis dalam bahasa Melayu Kuno.",
        },
        {
          correct: false,
          label:
            "Bahasa Melayu adalah bahasa tertua di dunia yang masih dipakai, karena prasasti itu berumur lebih dari seribu tahun.",
        },
        {
          correct: false,
          label:
            "Bahasa Melayu sudah dipakai untuk tulisan di wilayah ini sejak abad ketujuh, dan tidak ada bahasa lain yang pernah ditulis di Sriwijaya.",
        },
        {
          correct: true,
          label:
            "Bahasa Melayu sudah dipakai untuk tulisan di wilayah ini sejak abad ketujuh, tetapi satu prasasti tidak menunjukkan bahasa apa yang dipakai semua penduduk sehari-hari.",
        },
      ],
    },
  },
};

export default item;
