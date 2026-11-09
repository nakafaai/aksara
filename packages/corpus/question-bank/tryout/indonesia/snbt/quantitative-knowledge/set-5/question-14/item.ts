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
            "Panjang diagonal terpendeknya adalah $$4\\sqrt2\\text{ cm}$$.",
        },
        {
          column: 1,
          label: "Panjang diagonal terpanjangnya adalah $$8\\text{ cm}$$.",
        },
        {
          column: 2,
          label: "Jari-jari lingkaran dalamnya adalah $$4\\text{ cm}$$.",
        },
        { column: 1, label: "Luasnya adalah $$24\\sqrt3\\text{ cm}^2$$." },
      ],
    },
  },
};

export default item;
