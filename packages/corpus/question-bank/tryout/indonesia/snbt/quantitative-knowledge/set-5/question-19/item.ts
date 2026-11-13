import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        { column: 2, label: "Barisan itu adalah barisan aritmetika." },
        { column: 1, label: "Suku ke-$$15$$ barisan itu adalah $$53$$." },
        {
          column: 2,
          label: "Ada $$2$$ suku berurutan yang jumlahnya $$2{.}026$$.",
        },
        { column: 1, label: "$$a_1+a_3+a_5+\\dots+a_{19}=333$$." },
      ],
    },
  },
};

export default item;
