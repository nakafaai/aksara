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
            "Terdapat tepat satu nilai $$k$$ sehingga matriks $$A$$ tidak mempunyai invers.",
        },
        { column: 2, label: "$$AB=BA$$ hanya jika $$k=1$$." },
        {
          column: 2,
          label:
            "$$\\det(A+B)=\\det A+\\det B$$ untuk setiap bilangan real $$k$$.",
        },
        {
          column: 1,
          label: "Untuk $$k=4$$, berlaku $$(AB)^{-1}=A^{-1}B^{-1}$$.",
        },
      ],
    },
  },
};

export default item;
