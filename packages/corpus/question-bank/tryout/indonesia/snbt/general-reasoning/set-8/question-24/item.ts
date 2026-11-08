import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "quantitative-reasoning",
    topic: "data-interpretation",
  },
  stimulus: "motor",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Bensin yang terpakai oleh keempat motor dalam minggu itu lebih dari $$40$$ liter.",
        },
        {
          column: 1,
          label:
            "Motor R menempuh jarak paling pendek, tetapi paling hemat bensin.",
        },
        {
          column: 1,
          label:
            "Jika harga bensin $$\\text{Rp}10{.}000$$ per liter, biaya bensin motor S selama minggu itu adalah $$\\text{Rp}100{.}000$$.",
        },
        {
          column: 2,
          label:
            "Efisiensi gabungan keempat motor lebih dari $$42$$ km per liter.",
        },
      ],
    },
  },
};

export default item;
