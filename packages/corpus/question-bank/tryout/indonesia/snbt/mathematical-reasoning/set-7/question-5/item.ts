import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "profit-sharing",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "$$\\text{Rp}57$$ juta" },
        { correct: false, label: "$$\\text{Rp}60$$ juta" },
        { correct: false, label: "$$\\text{Rp}62$$ juta" },
        { correct: false, label: "$$\\text{Rp}76$$ juta" },
        { correct: false, label: "$$\\text{Rp}84$$ juta" },
      ],
    },
  },
};

export default item;
