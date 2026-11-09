import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "volleyball-league",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$15$$" },
        { correct: false, label: "$$30$$" },
        { correct: false, label: "$$36$$" },
        { correct: false, label: "$$40$$" },
        { correct: true, label: "$$45$$" },
      ],
    },
  },
};

export default item;
