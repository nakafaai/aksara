import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$C$$",
        },
        {
          correct: false,
          label: "$$A$$",
        },
        {
          correct: false,
          label: "$$B$$",
        },
        {
          correct: false,
          label: "Mesin $$A$$ dan $$C$$ memiliki indeks tertinggi yang sama",
        },
        {
          correct: false,
          label: "Mesin $$B$$ dan $$C$$ memiliki indeks tertinggi yang sama",
        },
      ],
    },
  },
};

export default item;
