import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "arrangement",
  },
  stimulus: "meja",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "N duduk di kursi $$3$$ atau kursi $$4$$.",
        },
        {
          column: 1,
          label:
            "Salah satu dari L dan M duduk di kursi bernomor genap, sedangkan yang lain duduk di kursi bernomor ganjil.",
        },
        {
          column: 2,
          label: "O duduk di kursi bernomor ganjil.",
        },
        {
          column: 2,
          label: "P duduk berhadapan dengan L atau dengan M.",
        },
      ],
    },
  },
};

export default item;
