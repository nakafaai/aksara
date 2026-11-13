import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  stimulus: "cicilan",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label: "Untuk besar uang muka yang sama, cicilan per bulan tenor $$12$$ bulan kurang dari setengah cicilan per bulan tenor $$6$$ bulan.",
        },
        {
          column: 1,
          label: "Untuk besar uang muka yang sama, total pembayaran kredit tenor $$18$$ bulan selalu lebih besar daripada tenor $$12$$ bulan, tetapi selisihnya tidak pernah lebih dari $$\\text{Rp}324{.}000$$.",
        },
        {
          column: 2,
          label: "Untuk setiap besar uang muka yang diizinkan, total pembayaran kredit tenor $$6$$ bulan lebih dari $$10\\%$$ di atas harga tunai.",
        },
      ],
    },
  },
};

export default item;
