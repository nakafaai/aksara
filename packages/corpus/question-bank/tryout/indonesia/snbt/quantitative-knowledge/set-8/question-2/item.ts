import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$23$$" },
        { correct: false, label: "$$107$$" },
        { correct: false, label: "$$117$$" },
        { correct: true, label: "$$119$$" },
        { correct: false, label: "$$121$$" },
      ],
    },
  },
};

export default item;
