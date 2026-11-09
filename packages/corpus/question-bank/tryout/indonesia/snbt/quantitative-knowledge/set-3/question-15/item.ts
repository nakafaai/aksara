import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        { column: 2, label: "Sudut $$AOB$$ adalah sudut lancip." },
        {
          column: 1,
          label:
            "Jarak titik $$O$$ ke tali busur $$AB$$ adalah $$6\\text{ cm}$$.",
        },
        {
          column: 1,
          label: "Luas segitiga $$AOB$$ adalah $$48\\text{ cm}^2$$.",
        },
        {
          column: 2,
          label: "Panjang busur kecil $$AB$$ kurang dari $$16\\text{ cm}$$.",
        },
      ],
    },
  },
};

export default item;
