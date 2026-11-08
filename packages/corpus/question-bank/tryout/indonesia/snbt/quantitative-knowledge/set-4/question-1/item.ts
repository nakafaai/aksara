import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$5$$" },
        { correct: false, label: "$$18$$" },
        { correct: false, label: "$$90$$" },
        { correct: false, label: "$$720$$" },
        { correct: true, label: "$$18{.}000$$" },
      ],
    },
  },
};

export default item;
