import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$B$$",
        },
        {
          correct: false,
          label: "$$C$$",
        },
        {
          correct: true,
          label: "$$A$$",
        },
        {
          correct: false,
          label: "Mesin $$A$$ dan $$B$$ memiliki indeks tertinggi yang sama.",
        },
        {
          correct: false,
          label: "Mesin $$B$$ dan $$C$$ memiliki indeks tertinggi yang sama.",
        },
      ],
    },
  },
};

export default item;
