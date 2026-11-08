import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "cake-recipe",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Biaya bahan untuk membuat 24 potong kue adalah $$\\text{Rp}25{.}000{,}00$$.",
        },
        {
          column: 1,
          label: "Untuk membuat 30 potong kue diperlukan 8 butir telur.",
        },
        {
          column: 1,
          label:
            "Perbandingan berat tepung dan berat gula dalam resep adalah $$5:3$$.",
        },
        {
          column: 2,
          label:
            "Dengan 1 kg tepung, dan bahan lain tersedia cukup, dapat dibuat paling banyak 40 potong kue.",
        },
      ],
    },
  },
};

export default item;
