import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "cake-recipe",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$18$$" },
        { correct: false, label: "$$36$$" },
        { correct: true, label: "$$37$$" },
        { correct: false, label: "$$40$$" },
        { correct: false, label: "$$48$$" },
      ],
    },
  },
};

export default item;
