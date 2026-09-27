import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Setiap zat gizi yang tercantum pada nangka lebih tinggi daripada nilai yang sama pada jeruk bali.",
        },
        {
          isCorrect: true,
          label:
            "Jumlah kandungan kalsium jeruk bali dan alpukat lebih rendah dibandingkan jumlah kandungan kalsium kedondong dan nangka.",
        },
        {
          isCorrect: false,
          label:
            "Setiap zat gizi yang tercantum pada alpukat lebih tinggi daripada nilai yang sama pada jeruk bali.",
        },
        {
          isCorrect: false,
          label:
            "Jumlah kandungan protein jeruk bali dan nangka lebih tinggi dibandingkan jumlah kandungan protein alpukat dan kedondong.",
        },
        {
          isCorrect: false,
          label:
            "Nangka memiliki nilai tertinggi untuk setiap zat gizi yang tercantum.",
        },
      ],
    },
  },
};

export default item;
