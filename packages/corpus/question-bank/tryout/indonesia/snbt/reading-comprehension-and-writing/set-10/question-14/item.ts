import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "argument-evaluation",
  },
  stimulus: "larva-monitors",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Pada dua tahun itu, kasus demam berdarah di kelurahan lain yang tidak memiliki juru pemantau jentik juga turun hampir sebanyak itu.",
        },
        {
          correct: false,
          label:
            "Juru pemantau memeriksa bak mandi dan vas bunga setiap pekan.",
        },
        {
          correct: false,
          label: "Kartu pemantauan dikumpulkan kader kesehatan setiap bulan.",
        },
        {
          correct: false,
          label: "Anak-anak senang menjadi juru pemantau jentik.",
        },
        {
          correct: false,
          label:
            "Rumah yang memiliki juru pemantau jarang ditemukan jentik nyamuk.",
        },
      ],
    },
  },
};

export default item;
