import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Tim akan memperpanjang uji sambil mengubah ukuran kesesuaian pesanan.",
        },
        {
          correct: false,
          label:
            "Tim akan mengulang hanya sesi dengan jumlah pesanan sesuai tertinggi.",
        },
        {
          correct: true,
          label:
            "Tim akan memperpanjang uji pemesanan awal, mencatat kehadiran dan sisa makanan, serta mempertahankan ukuran kesesuaian pesanan.",
        },
        {
          correct: false,
          label:
            "Tim akan menerapkan pemesanan awal permanen sebagai pengganti uji lanjutan.",
        },
        {
          correct: false,
          label:
            "Tim akan memperpanjang uji tanpa mencatat kehadiran dan sisa makanan.",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
