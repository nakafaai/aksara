import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "paint-mixing",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Campuran di ember itu dapat diperbaiki menjadi Hijau Daun tanpa menambahkan cat biru.",
        },
        {
          column: 2,
          label:
            "Banyak Hijau Daun paling sedikit yang dihasilkan perbaikan itu adalah $$12\\text{ liter}$$.",
        },
        {
          column: 2,
          label:
            "Biaya paling murah untuk membeli kaleng tambahan yang diperlukan paling banyak $$\\text{Rp}150{.}000{,}00$$.",
        },
        {
          column: 2,
          label:
            "Jika kaleng tambahan dibeli dengan biaya paling murah, cat dasar yang tersisa di kaleng-kaleng tambahan itu sebanyak $$0{,}5\\text{ liter}$$.",
        },
      ],
    },
  },
};

export default item;
