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
            "Banyak bilangan bulat $$c$$ sehingga lingkaran itu memotong sumbu $$y$$ di dua titik tetapi tidak memotong sumbu $$x$$ adalah $$7$$.",
        },
        {
          column: 1,
          label:
            "Jika titik asal berada di dalam lingkaran itu, maka lingkaran itu memotong sumbu $$x$$ di dua titik dan memotong sumbu $$y$$ di dua titik.",
        },
        {
          column: 2,
          label:
            "Ada nilai $$c$$ sehingga lingkaran itu menyinggung sumbu $$x$$ dan juga menyinggung garis $$y=x$$.",
        },
        {
          column: 1,
          label:
            "Untuk setiap nilai $$c$$ yang mungkin, garis $$3x+4y+7=0$$ memotong lingkaran itu di dua titik.",
        },
      ],
    },
  },
};

export default item;
