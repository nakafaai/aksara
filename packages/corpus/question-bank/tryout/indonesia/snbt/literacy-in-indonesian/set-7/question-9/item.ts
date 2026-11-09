import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "walkable-city",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Jumlah kendaraan pribadi di kota itu naik setiap tahun selama sepuluh tahun terakhir.",
        },
        {
          correct: false,
          label:
            "Biaya membangun trotoar lebih murah daripada biaya melebarkan jalan.",
        },
        {
          correct: false,
          label:
            "Sebagian pengendara mobil mengeluh karena lajur jalan menjadi lebih sempit.",
        },
        {
          correct: false,
          label:
            "Pedagang kaki lima lebih suka berjualan di trotoar yang lebar.",
        },
        {
          correct: true,
          label:
            "Setelah trotoar diperbaiki, pejalan kaki bertambah dan perjalanan pendek naik ojek turun.",
        },
      ],
    },
  },
};

export default item;
