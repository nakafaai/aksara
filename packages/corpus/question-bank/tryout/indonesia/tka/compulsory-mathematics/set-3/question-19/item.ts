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
          label: "Keliling alas dikalikan $$3$$.",
        },
        {
          column: 1,
          label: "Luas alas dikalikan $$9$$.",
        },
        {
          column: 1,
          label: "Volume dikalikan $$\\frac92$$.",
        },
        {
          column: 2,
          label: "Garis pelukis selalu dikalikan $$\\frac32$$.",
        },
        {
          column: 2,
          label: "Luas selimut selalu dikalikan $$\\frac92$$.",
        },
      ],
    },
  },
};

export default item;
