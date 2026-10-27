import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Tim akan memperpanjang uji panah sambil mengubah ukuran penyelesaian rute.",
        },
        {
          correct: false,
          label:
            "Tim akan mengulang hanya sesi dengan jumlah penyelesaian rute tertinggi.",
        },
        {
          correct: false,
          label:
            "Tim akan menerapkan panah permanen sebagai pengganti pengujian lanjutan.",
        },
        {
          correct: false,
          label:
            "Tim akan memperpanjang uji tanpa mencatat titik pengunjung berbalik.",
        },
        {
          correct: true,
          label:
            "Tim akan memperpanjang uji panah, mencatat titik pengunjung berbalik, dan mempertahankan ukuran penyelesaian rute.",
        },
      ],
    },
  },
};

export default item;
