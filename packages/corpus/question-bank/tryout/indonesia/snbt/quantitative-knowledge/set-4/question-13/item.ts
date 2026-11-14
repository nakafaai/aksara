import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$13$$" },
        { correct: false, label: "$$11$$" },
        { correct: false, label: "$$10$$" },
        { correct: true, label: "$$9$$" },
        { correct: false, label: "$$6$$" },
      ],
    },
  },
};

export default item;
