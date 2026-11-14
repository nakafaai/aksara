import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "data-plans",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Untuk pemakaian 25 GB dalam sebulan, Paket Bebas lebih murah $$\\text{Rp}65{.}000{,}00$$ daripada Paket Hemat.",
        },
        {
          column: 2,
          label:
            "Untuk pemakaian 12 GB dalam sebulan, Paket Bebas lebih murah daripada Paket Hemat.",
        },
        {
          column: 1,
          label:
            "Untuk pemakaian di atas 20 GB, setiap tambahan 1 GB memperbesar selisih biaya kedua paket sebesar $$\\text{Rp}4{.}000{,}00$$.",
        },
        {
          column: 2,
          label:
            "Dengan anggaran $$\\text{Rp}150{.}000{,}00$$ per bulan, pelanggan Paket Hemat dapat memakai paling banyak 22 GB.",
        },
      ],
    },
  },
};

export default item;
