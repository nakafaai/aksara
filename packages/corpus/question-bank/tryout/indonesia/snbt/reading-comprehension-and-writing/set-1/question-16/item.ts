import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "tekanan terhadap pasar mobil Indonesia selama 2020.",
        },
        {
          correct: false,
          label: "jumlah kendaraan yang dikirim pada April.",
        },
        {
          correct: false,
          label: "titik terendah penjualan pada Mei.",
        },
        {
          correct: false,
          label: "pemulihan penjualan pada Desember.",
        },
        {
          correct: true,
          label: "turunnya penjualan wholesales dari 2019 ke 2020.",
        },
      ],
    },
  },
};

export default item;
