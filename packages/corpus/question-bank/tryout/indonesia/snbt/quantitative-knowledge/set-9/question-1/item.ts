import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$15$$" },
        { correct: false, label: "$$24$$" },
        { correct: true, label: "$$39$$" },
        { correct: false, label: "$$47$$" },
        { correct: false, label: "$$63$$" },
      ],
    },
  },
};

export default item;
