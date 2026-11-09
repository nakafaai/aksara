import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$111$$" },
        { correct: false, label: "$$112$$" },
        { correct: false, label: "$$200$$" },
        { correct: true, label: "$$201$$" },
        { correct: false, label: "$$250$$" },
      ],
    },
  },
};

export default item;
