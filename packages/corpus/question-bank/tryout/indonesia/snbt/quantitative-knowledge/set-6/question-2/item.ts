import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "$$(1,-1)$$" },
        { correct: false, label: "$$(1,1)$$" },
        { correct: false, label: "$$(1,2)$$" },
        { correct: false, label: "$$(1,7)$$" },
        { correct: false, label: "$$(1,-1)$$ atau $$(1,1)$$" },
      ],
    },
  },
};

export default item;
