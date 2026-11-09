import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "quantitative-reasoning",
    topic: "absolute-value",
  },
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label: "Ada tepat $$10$$ bilangan bulat $$x$$ yang memenuhi.",
        },
        {
          column: 2,
          label: "Nilai $$x$$ terkecil yang memenuhi adalah $$-2$$.",
        },
        {
          column: 1,
          label: "Jumlah semua nilai $$x$$ yang memenuhi adalah $$27$$.",
        },
        {
          column: 1,
          label: "Ada tepat $$4$$ bilangan genap $$x$$ yang memenuhi.",
        },
      ],
    },
  },
};

export default item;
