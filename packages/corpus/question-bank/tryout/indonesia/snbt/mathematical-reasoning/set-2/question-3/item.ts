import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "ride-fare",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Tarif Aplikasi Cepat untuk perjalanan 3,2 km adalah $$\\text{Rp}12{.}000{,}00$$.",
        },
        {
          column: 2,
          label:
            "Tarif Aplikasi Cepat untuk perjalanan 1 km adalah $$\\text{Rp}3{.}000{,}00$$.",
        },
        {
          column: 2,
          label:
            "Di luar jam sibuk, untuk perjalanan 6 km, Aplikasi Jalan lebih murah daripada Aplikasi Cepat.",
        },
        {
          column: 1,
          label:
            "Di luar jam sibuk, untuk perjalanan 12 km, Aplikasi Jalan lebih murah daripada Aplikasi Cepat.",
        },
      ],
    },
  },
};

export default item;
