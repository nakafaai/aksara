import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Luas sisi $$pl$$ dikalikan $$6$$.",
        },
        {
          column: 1,
          label: "Luas sisi $$lt$$ dikalikan $$\\frac32$$.",
        },
        {
          column: 1,
          label: "Volume dikalikan $$3$$.",
        },
        {
          column: 2,
          label: "Setiap diagonal ruang dikalikan $$2$$.",
        },
        {
          column: 2,
          label: "Luas permukaan total selalu dikalikan $$3$$.",
        },
      ],
    },
  },
};

export default item;
