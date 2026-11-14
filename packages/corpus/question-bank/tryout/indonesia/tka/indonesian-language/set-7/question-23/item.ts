import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "information-quality",
  },
  stimulus: "sachet-waste",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "poster itu tepat karena harga kopi curah lebih murah",
        },
        {
          correct: false,
          label:
            "poster itu benar karena saset hanya 8 persen dari berat sampah plastik",
        },
        {
          correct: false,
          label:
            "poster itu salah karena warung curah justru menambah sampah plastik",
        },
        {
          correct: true,
          label:
            "poster itu berlebihan karena penjualan curah baru dicoba di sebagian kecil warung dan belum menarik semua pembeli",
        },
        {
          correct: false,
          label: "poster itu tidak berhubungan dengan masalah sampah saset",
        },
      ],
    },
  },
};

export default item;
