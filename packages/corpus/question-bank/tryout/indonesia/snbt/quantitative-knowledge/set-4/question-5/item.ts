import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "$$10$$" },
        { correct: false, label: "$$20$$" },
        { correct: false, label: "$$29$$" },
        { correct: false, label: "$$39$$" },
        { correct: false, label: "$$49$$" },
      ],
    },
  },
};

export default item;
