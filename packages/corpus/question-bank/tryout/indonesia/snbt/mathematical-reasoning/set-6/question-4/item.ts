import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "football-league",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "$$20$$" },
        { correct: false, label: "$$21$$" },
        { correct: false, label: "$$24$$" },
        { correct: false, label: "$$27$$" },
        { correct: false, label: "$$30$$" },
      ],
    },
  },
};

export default item;
