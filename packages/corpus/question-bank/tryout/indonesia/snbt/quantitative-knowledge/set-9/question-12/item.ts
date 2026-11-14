import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Untuk $$c=25$$, persamaan itu menyatakan lingkaran yang jari-jarinya positif.",
        },
        {
          column: 1,
          label:
            "Jika lingkaran itu menyinggung sumbu $$x$$, maka lingkaran itu memotong sumbu $$y$$ di dua titik.",
        },
        {
          column: 2,
          label:
            "Jika lingkaran itu melalui titik asal, maka garis $$4x-3y=0$$ menyinggung lingkaran itu.",
        },
        {
          column: 2,
          label:
            "Jika lingkaran itu menyinggung sumbu $$y$$, maka titik asal berada di dalam lingkaran itu.",
        },
      ],
    },
  },
};

export default item;
