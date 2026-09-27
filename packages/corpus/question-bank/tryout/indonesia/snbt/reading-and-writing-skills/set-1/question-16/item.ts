import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "tekanan terhadap pasar mobil Indonesia selama 2020.",
        },
        {
          isCorrect: false,
          label: "jumlah kendaraan yang dikirim pada April.",
        },
        {
          isCorrect: false,
          label: "titik terendah penjualan pada Mei.",
        },
        {
          isCorrect: false,
          label: "pemulihan penjualan pada Desember.",
        },
        {
          isCorrect: true,
          label: "turunnya penjualan wholesales dari 2019 ke 2020.",
        },
      ],
    },
  },
};

export default item;
