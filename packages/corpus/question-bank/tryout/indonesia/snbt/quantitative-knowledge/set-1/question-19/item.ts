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
            "Untuk $$k=2$$, sistem itu mempunyai tak hingga banyak penyelesaian.",
        },
        {
          column: 2,
          label: "Untuk $$k=3$$, sistem itu tidak mempunyai penyelesaian.",
        },
        {
          column: 2,
          label:
            "Tidak ada nilai $$k$$ yang membuat sistem itu mempunyai penyelesaian dengan $$z=0$$.",
        },
        {
          column: 1,
          label:
            "Untuk setiap nilai $$k$$ selain $$2$$ dan $$3$$, penyelesaian sistem itu tunggal dan memenuhi $$y=0$$.",
        },
      ],
    },
  },
};

export default item;
