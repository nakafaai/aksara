import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Harga tas setelah diskon adalah $$\\text{Rp}150{.}000{,}00$$.",
        },
        {
          column: 2,
          label:
            "Besar potongan harga total terhadap harga awal adalah $$15\\%$$.",
        },
        {
          column: 1,
          label:
            "Harga yang dibayar pembeli adalah $$\\text{Rp}165{.}000{,}00$$.",
        },
        {
          column: 2,
          label:
            "Jika pajak $$10\\%$$ dikenakan lebih dulu, lalu diskon $$25\\%$$ diberikan pada harga setelah pajak, harga yang dibayar menjadi lebih mahal.",
        },
      ],
    },
  },
};

export default item;
