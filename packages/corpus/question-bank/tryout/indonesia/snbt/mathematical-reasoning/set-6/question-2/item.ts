import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "football-league",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$2$$" },
        { correct: true, label: "$$3$$" },
        { correct: false, label: "$$5$$" },
        { correct: false, label: "$$6$$" },
        { correct: false, label: "$$10$$" },
      ],
    },
  },
};

export default item;
