import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$(-6,2)$$" },
        { correct: false, label: "$$(-2,-6)$$" },
        { correct: false, label: "$$(-2,6)$$" },
        { correct: false, label: "$$(6,2)$$" },
        { correct: true, label: "$$(2,6)$$" },
      ],
    },
  },
};

export default item;
