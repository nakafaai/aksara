import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "fiction",
    topic: "explicit-information",
  },
  stimulus: "tea-picker",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Mak Inah memetik pucuk teratas dengan dua daun muda di bawahnya.",
        },
        {
          column: 1,
          label:
            "Pemetik dari lereng timur akan dipindah ke bagian pengeringan.",
        },
        {
          column: 2,
          label: "Mulai bulan depan, seluruh kebun teh dipanen dengan mesin.",
        },
        {
          column: 2,
          label:
            "Laras datang ke kebun untuk menggantikan neneknya memetik teh.",
        },
      ],
    },
  },
};

export default item;
