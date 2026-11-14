import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "game-energy",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$52$$" },
        { correct: false, label: "$$60$$" },
        { correct: true, label: "$$66$$" },
        { correct: false, label: "$$72$$" },
        { correct: false, label: "$$75$$" },
      ],
    },
  },
};

export default item;
