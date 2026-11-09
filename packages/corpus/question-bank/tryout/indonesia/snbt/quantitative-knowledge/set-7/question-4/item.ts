import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        { column: 1, label: "Nilai maksimum $$f$$ adalah $$18$$." },
        {
          column: 2,
          label: "Sumbu simetri grafik $$f$$ adalah garis $$x=3$$.",
        },
        { column: 2, label: "$$f(x)>0$$ untuk setiap $$x$$ dengan $$0<x<6$$." },
        { column: 1, label: "$$a+b+c=16$$" },
      ],
    },
  },
};

export default item;
