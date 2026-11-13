import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "geometry-measurement",
    topic: "geometry-objects",
  },
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Garis singgung lingkaran di $$A$$ dan garis singgung lingkaran di $$B$$ berpotongan di titik $$P$$ dengan $$OP=20\\text{ cm}$$.",
        },
        {
          column: 2,
          label: "Panjang busur kecil $$AB$$ kurang dari $$20\\text{ cm}$$.",
        },
        {
          column: 2,
          label:
            "Jika $$C$$ adalah titik pada lingkaran dengan $$CA=CB$$, luas segitiga $$ABC$$ pasti $$75\\sqrt{3}\\text{ cm}^2$$.",
        },
      ],
    },
  },
};

export default item;
