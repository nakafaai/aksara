import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$4\\text{ cm}$$" },
        { correct: false, label: "$$8\\text{ cm}$$" },
        { correct: false, label: "$$12\\text{ cm}$$" },
        { correct: true, label: "$$24\\text{ cm}$$" },
        { correct: false, label: "$$32\\text{ cm}$$" },
      ],
    },
  },
};

export default item;
