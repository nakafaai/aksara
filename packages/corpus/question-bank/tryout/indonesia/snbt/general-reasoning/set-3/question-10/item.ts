import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Setiap zat gizi yang tercantum pada nangka lebih tinggi daripada nilai yang sama pada jeruk bali.",
        },
        {
          correct: true,
          label:
            "Jumlah kandungan kalsium jeruk bali dan alpukat lebih rendah dibandingkan jumlah kandungan kalsium kedondong dan nangka.",
        },
        {
          correct: false,
          label:
            "Setiap zat gizi yang tercantum pada alpukat lebih tinggi daripada nilai yang sama pada jeruk bali.",
        },
        {
          correct: false,
          label:
            "Jumlah kandungan protein jeruk bali dan nangka lebih tinggi dibandingkan jumlah kandungan protein alpukat dan kedondong.",
        },
        {
          correct: false,
          label:
            "Nangka memiliki nilai tertinggi untuk setiap zat gizi yang tercantum.",
        },
      ],
    },
  },
};

export default item;
