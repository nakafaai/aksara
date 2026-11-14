import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "cinema-pricing",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Menurunkan harga dari $$\\text{Rp}50{.}000$$ menjadi $$\\text{Rp}45{.}000$$ menaikkan pendapatan tiket.",
        },
        {
          column: 2,
          label:
            "Keuntungan pertunjukan pada harga $$\\text{Rp}30{.}000$$ sama dengan keuntungan pertunjukan pada harga $$\\text{Rp}50{.}000$$.",
        },
        {
          column: 1,
          label:
            "Pada harga tertinggi yang membuat semua kursi terisi, keuntungan pertunjukan lebih kecil daripada keuntungan pertunjukan pada harga $$\\text{Rp}50{.}000$$.",
        },
        {
          column: 1,
          label:
            "Harga tertinggi yang masih memberi keuntungan pertunjukan positif adalah $$\\text{Rp}80{.}000$$.",
        },
      ],
    },
  },
};

export default item;
