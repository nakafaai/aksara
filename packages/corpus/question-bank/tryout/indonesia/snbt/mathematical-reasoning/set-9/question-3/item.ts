import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "phone-credit",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Uang muka pembelian kredit adalah $$\\text{Rp}720{.}000{,}00$$.",
        },
        {
          column: 2,
          label:
            "Bunga flat $$2\\%$$ per bulan berarti total bunga selama 12 bulan sebesar $$2\\%$$ dari pokok.",
        },
        {
          column: 1,
          label:
            "Dengan bunga flat, besar bunga yang dibayar pada bulan ke-12 sama dengan besar bunga pada bulan pertama.",
        },
        {
          column: 2,
          label:
            "Jika uang muka dinaikkan, total bunga yang dibayar pembeli kredit ikut naik.",
        },
      ],
    },
  },
};

export default item;
