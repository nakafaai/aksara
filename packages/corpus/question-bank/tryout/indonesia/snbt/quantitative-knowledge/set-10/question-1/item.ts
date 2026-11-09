import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$30$$" },
        { correct: true, label: "$$35$$" },
        { correct: false, label: "$$40$$" },
        { correct: false, label: "$$63$$" },
        { correct: false, label: "$$117$$" },
      ],
    },
  },
};

export default item;
