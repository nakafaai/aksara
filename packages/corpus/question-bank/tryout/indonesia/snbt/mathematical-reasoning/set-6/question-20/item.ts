import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "concrete-mix",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$11$$" },
        { correct: false, label: "$$15$$" },
        { correct: false, label: "$$17$$" },
        { correct: false, label: "$$20$$" },
        { correct: true, label: "$$22$$" },
      ],
    },
  },
};

export default item;
