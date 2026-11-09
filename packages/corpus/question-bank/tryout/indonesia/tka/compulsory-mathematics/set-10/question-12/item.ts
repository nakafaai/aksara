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
          label: "$$\\angle ABC$$ adalah sudut terbesar segitiga $$ABC$$.",
        },
        {
          column: 2,
          label: "Segitiga $$ABC$$ siku-siku.",
        },
        {
          column: 1,
          label: "Ketiga sudut segitiga $$ABC$$ kurang dari $$90^\\circ$$.",
        },
        {
          column: 2,
          label:
            "Jika panjang $$AB$$ diganti menjadi $$23\\text{ cm}$$ sementara $$BC$$ dan $$AC$$ tetap, ketiga ruas garis itu masih dapat membentuk segitiga.",
        },
      ],
    },
  },
};

export default item;
