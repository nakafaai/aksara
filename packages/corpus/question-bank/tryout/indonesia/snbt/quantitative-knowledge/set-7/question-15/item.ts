import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$1{,}3$$" },
        { correct: false, label: "$$2{,}2$$" },
        { correct: false, label: "$$2{,}3$$" },
        { correct: false, label: "$$2{,}4$$" },
        { correct: true, label: "$$2{,}5$$" },
      ],
    },
  },
};

export default item;
