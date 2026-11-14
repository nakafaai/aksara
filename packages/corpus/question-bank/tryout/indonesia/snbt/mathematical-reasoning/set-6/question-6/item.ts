import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "paper-folding",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$10$$" },
        { correct: false, label: "$$12$$" },
        { correct: false, label: "$$13$$" },
        { correct: true, label: "$$14$$" },
        { correct: false, label: "$$100$$" },
      ],
    },
  },
};

export default item;
