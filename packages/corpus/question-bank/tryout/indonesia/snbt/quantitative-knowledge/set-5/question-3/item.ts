import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Daerah asal $$h$$ memuat tepat $$2$$ bilangan bulat.",
        },
        {
          column: 2,
          label: "Persamaan $$h(x)=0$$ mempunyai tepat $$1$$ penyelesaian.",
        },
        {
          column: 1,
          label: "Ada bilangan real $$x$$ yang memenuhi $$h(x)=3$$.",
        },
        {
          column: 1,
          label:
            "Jika $$x$$ anggota daerah asal $$h$$, maka $$2-x$$ juga anggota daerah asal $$h$$.",
        },
      ],
    },
  },
};

export default item;
