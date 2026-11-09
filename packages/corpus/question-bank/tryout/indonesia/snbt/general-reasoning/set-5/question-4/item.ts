import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "data-inference",
  },
  stimulus: "bus",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Sebagian penumpang yang semula berangkat pukul 06.30 sampai 08.00 beralih ke keberangkatan yang lebih pagi.",
        },
        {
          correct: false,
          label:
            "Penurunan tarif pagi menarik $$900$$ penumpang baru yang sebelumnya tidak pernah naik bus koridor $$3$$ pada jam berapa pun.",
        },
        {
          correct: false,
          label:
            "Pendapatan tiket harian koridor $$3$$ naik setelah tarif pagi diturunkan.",
        },
        {
          correct: false,
          label:
            "Jumlah penumpang pada setiap rentang waktu keberangkatan naik dari Februari ke April.",
        },
        {
          correct: false,
          label:
            "Penumpang pukul 16.00 sampai 19.00 bertambah karena tarif pada rentang itu ikut turun.",
        },
      ],
    },
  },
};

export default item;
