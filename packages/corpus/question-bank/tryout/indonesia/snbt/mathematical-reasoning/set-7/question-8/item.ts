import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "profit-sharing",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\text{Rp}144$$ juta" },
        { correct: false, label: "$$\\text{Rp}160$$ juta" },
        { correct: false, label: "$$\\text{Rp}162$$ juta" },
        { correct: false, label: "$$\\text{Rp}170{,}4$$ juta" },
        { correct: true, label: "$$\\text{Rp}172$$ juta" },
      ],
    },
  },
};

export default item;
