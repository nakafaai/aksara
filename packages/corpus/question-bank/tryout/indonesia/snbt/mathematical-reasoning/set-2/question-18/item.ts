import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "seedling-grid",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$216$$" },
        { correct: false, label: "$$224$$" },
        { correct: false, label: "$$266$$" },
        { correct: false, label: "$$270$$" },
        { correct: true, label: "$$280$$" },
      ],
    },
  },
};

export default item;
