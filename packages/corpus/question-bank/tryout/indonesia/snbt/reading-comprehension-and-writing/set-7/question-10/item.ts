import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tim akan memperpanjang uji sambil mengubah ukuran kesesuaian pesanan.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan mengulang hanya sesi dengan jumlah pesanan sesuai tertinggi.",
        },
        {
          isCorrect: true,
          label:
            "Tim akan memperpanjang uji pemesanan awal, mencatat kehadiran dan sisa makanan, serta mempertahankan ukuran kesesuaian pesanan.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan menerapkan pemesanan awal permanen sebagai pengganti uji lanjutan.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan memperpanjang uji tanpa mencatat kehadiran dan sisa makanan.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
