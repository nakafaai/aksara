import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "fuel-trip",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Biaya bensin untuk seluruh perjalanan itu adalah $$\\text{Rp}160{.}000{,}00$$.",
        },
        {
          column: 2,
          label:
            "Rata-rata jarak per liter selama perjalanan sama dengan rata-rata dari 10 km dan 15 km.",
        },
        {
          column: 2,
          label:
            "Dengan tangki penuh, jarak terjauh yang dapat ditempuh mobil itu jika seluruhnya melalui jalan tol adalah 500 km.",
        },
        {
          column: 1,
          label:
            "Jika bagian 60 km itu juga ditempuh melalui jalan tol, bensin yang dipakai berkurang 2 liter.",
        },
      ],
    },
  },
};

export default item;
