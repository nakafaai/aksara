import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "algebra",
    topic: "linear-equations-inequalities",
  },
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Keuntungan maksimum diperoleh dengan menyiapkan $$84$$ nampan cabai dan $$24$$ nampan tomat.",
        },
        {
          column: 2,
          label: "Pada keuntungan maksimum, dana bahan masih tersisa $$\\text{Rp}300{.}000$$.",
        },
        {
          column: 2,
          label: "Keuntungan maksimum yang dapat diperoleh adalah $$\\text{Rp}2{.}500{.}000$$.",
        },
        {
          column: 1,
          label: "Jika keuntungan satu nampan tomat naik menjadi $$\\text{Rp}45{.}000$$, keuntungan maksimum diperoleh dengan hanya menyiapkan nampan tomat.",
        },
      ],
    },
  },
};

export default item;
