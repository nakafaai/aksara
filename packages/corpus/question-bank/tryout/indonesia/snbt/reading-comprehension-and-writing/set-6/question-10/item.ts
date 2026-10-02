import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tim akan memperpanjang uji panah sambil mengubah ukuran penyelesaian rute.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan mengulang hanya sesi dengan jumlah penyelesaian rute tertinggi.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan menerapkan panah permanen sebagai pengganti pengujian lanjutan.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan memperpanjang uji tanpa mencatat titik pengunjung berbalik.",
        },
        {
          isCorrect: true,
          label:
            "Tim akan memperpanjang uji panah, mencatat titik pengunjung berbalik, dan mempertahankan ukuran penyelesaian rute.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
