import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "seedling-grid",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "$$110\\text{ cm}$$" },
        { correct: false, label: "$$115\\text{ cm}$$" },
        { correct: false, label: "$$120\\text{ cm}$$" },
        { correct: false, label: "$$130\\text{ cm}$$" },
        { correct: false, label: "$$140\\text{ cm}$$" },
      ],
    },
  },
};

export default item;
