import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        { column: 2, label: "Ada anggota $$S$$ yang kurang dari $$-1$$." },
        { column: 1, label: "Setiap anggota $$S$$ memenuhi $$x^3>x$$." },
        {
          column: 1,
          label: "Ada anggota $$S$$ yang kuadratnya kurang dari $$1$$.",
        },
        {
          column: 1,
          label:
            "Jika $$x$$ anggota $$S$$, maka $$-\\dfrac{1}{x}$$ juga anggota $$S$$.",
        },
      ],
    },
  },
};

export default item;
