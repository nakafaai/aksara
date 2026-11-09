import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$(2,1)$$" },
        { correct: false, label: "$$(-2,7)$$" },
        { correct: false, label: "$$(2,-7)$$" },
        { correct: false, label: "$$(6,9)$$" },
        { correct: true, label: "$$(2,7)$$" },
      ],
    },
  },
};

export default item;
