import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "weakening",
  },
  stimulus: "pesepeda",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Di ruas jalan koridor lain yang tidak diberi pembatas, jumlah kecelakaan pada 2025 juga turun separuh, sedangkan jumlah perjalanan sepeda di sana hampir tidak berubah.",
        },
        {
          correct: false,
          label:
            "Mulai Januari 2025, batas kecepatan kendaraan di semua persimpangan Kota Sagara diturunkan untuk melindungi pejalan kaki dan pesepeda.",
        },
        {
          correct: true,
          label:
            "Di ruas jalan koridor lain yang tidak diberi pembatas, risiko kecelakaan per perjalanan pada 2025 juga turun menjadi sekitar seperlima risiko pada 2024.",
        },
        {
          correct: false,
          label:
            "Sebagian besar pesepeda baru di keempat koridor pada 2025 adalah pelajar yang belum terbiasa bersepeda di tengah lalu lintas kota.",
        },
        {
          correct: false,
          label:
            "Kecelakaan di ruas jalan keempat koridor sudah turun dari $$60$$ pada 2022 menjadi $$30$$ pada 2024, dengan jumlah perjalanan yang hampir sama setiap tahun.",
        },
      ],
    },
  },
};

export default item;
