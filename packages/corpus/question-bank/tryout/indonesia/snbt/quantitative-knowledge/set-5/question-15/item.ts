import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "$$(-5,9)$$" },
        { correct: false, label: "$$(1,-1)$$" },
        { correct: false, label: "$$(3,1)$$" },
        { correct: false, label: "$$(1,7)$$" },
        { correct: false, label: "$$(-1,1)$$" },
      ],
    },
  },
};

export default item;
