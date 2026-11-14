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
          column: 2,
          label:
            "Luas seluruh permukaan benda sisa lebih kecil daripada luas seluruh permukaan tabung semula.",
        },
        {
          column: 1,
          label:
            "Volume benda sisa sama dengan $$\\frac{2}{3}$$ volume tabung semula.",
        },
        {
          column: 1,
          label:
            "Jarak terpendek dari puncak kerucut ke permukaan lengkung setengah bola adalah $$6$$ cm.",
        },
      ],
    },
  },
};

export default item;
