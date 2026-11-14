import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "loan-plans",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "setelah cicilan bulan kedelapan" },
        { correct: false, label: "setelah cicilan bulan kesembilan" },
        { correct: true, label: "setelah cicilan bulan kesepuluh" },
        { correct: false, label: "setelah cicilan bulan kedua belas" },
        { correct: false, label: "tidak pernah sampai pinjaman lunas" },
      ],
    },
  },
};

export default item;
