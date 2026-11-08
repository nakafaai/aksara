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
          label: "Jarak titik $$O$$ ke tali busur $$AB$$ adalah $$12\\text{ cm}$$.",
        },
        {
          column: 2,
          label: "Tali busur lain yang panjangnya $$24\\text{ cm}$$ berjarak $$34\\text{ cm}$$ dari $$O$$.",
        },
        {
          column: 2,
          label: "Luas segitiga $$OAB$$ adalah $$1{.}295\\text{ cm}^2$$.",
        },
        {
          column: 1,
          label: "Besar $$\\angle AOB$$ lebih dari $$120^\\circ$$.",
        },
      ],
    },
  },
};

export default item;
