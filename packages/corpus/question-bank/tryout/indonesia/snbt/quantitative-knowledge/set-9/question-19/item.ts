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
            "Garis $$y=2x$$ memotong kurva itu di tepat dua titik, dan jarak kedua titik itu $$\\sqrt{5}$$.",
        },
        {
          column: 2,
          label: "Setiap garis mendatar memotong kurva itu di tepat satu titik.",
        },
        {
          column: 1,
          label:
            "Untuk setiap bilangan real $$k$$, garis $$y=-x+k$$ memotong kurva itu di tepat satu titik.",
        },
        {
          column: 2,
          label: "Garis $$y=x$$ memotong kurva itu di paling sedikit satu titik.",
        },
      ],
    },
  },
};

export default item;
