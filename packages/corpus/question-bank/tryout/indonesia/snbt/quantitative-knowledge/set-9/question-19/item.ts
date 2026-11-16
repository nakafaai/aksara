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
            "Untuk setiap bilangan bulat $$m\\ge2$$, garis $$y=mx$$ memotong kurva itu di tepat dua titik.",
        },
        {
          column: 2,
          label:
            "Garis $$y=x+1$$ memotong kurva itu di tepat satu titik.",
        },
        {
          column: 2,
          label:
            "Ada bilangan real $$k$$ sehingga garis $$y=-2x+k$$ tidak memotong kurva itu.",
        },
        {
          column: 1,
          label: "Garis $$y=x$$ tidak memotong kurva itu.",
        },
      ],
    },
  },
};

export default item;
