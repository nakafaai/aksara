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
            "Tepat satu bilangan bulat anggota $$S$$ terletak di antara $$0$$ dan $$2$$.",
        },
        {
          column: 2,
          label:
            "Banyak bilangan bulat anggota $$S$$ yang kurang dari $$3$$ adalah $$4$$.",
        },
        {
          column: 2,
          label:
            "Jika $$x$$ anggota $$S$$, maka $$x+3$$ juga anggota $$S$$.",
        },
        {
          column: 1,
          label:
            "Setiap anggota $$S$$ yang negatif memenuhi $$x^2\\le4$$.",
        },
      ],
    },
  },
};

export default item;
