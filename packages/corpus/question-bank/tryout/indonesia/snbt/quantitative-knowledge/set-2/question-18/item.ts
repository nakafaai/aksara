import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$120$$" },
        { correct: false, label: "$$108$$" },
        { correct: false, label: "$$105$$" },
        { correct: true, label: "$$102$$" },
        { correct: false, label: "$$99$$" },
      ],
    },
  },
};

export default item;
