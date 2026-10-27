import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Simbol yang lebih kontras dipilih untuk mengatasi kesulitan peserta membedakan penanda.",
        },
        {
          correct: false,
          label:
            "Simbol yang lebih kontras menghapus kebutuhan untuk mengukur keberhasilan peserta.",
        },
        {
          correct: false,
          label:
            "Simbol yang lebih kontras memungkinkan tim mengubah banyak kondisi sekaligus.",
        },
        {
          correct: false,
          label:
            "Simbol yang lebih kontras menjelaskan mengapa semua nilai pembanding sama.",
        },
        {
          correct: false,
          label:
            "Simbol yang lebih kontras dipilih hanya karena hasil akhirnya sudah dipastikan.",
        },
      ],
    },
  },
};

export default item;
