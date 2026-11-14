import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "$$10$$" },
        { correct: false, label: "$$13$$" },
        { correct: false, label: "$$16$$" },
        { correct: false, label: "$$250$$" },
        { correct: false, label: "$$260$$" },
      ],
    },
  },
};

export default item;
