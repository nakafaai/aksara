import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$5{,}4\\text{ cm}$$" },
        { correct: false, label: "$$7{,}2\\text{ cm}$$" },
        { correct: false, label: "$$8\\text{ cm}$$" },
        { correct: false, label: "$$9\\text{ cm}$$" },
        { correct: true, label: "$$9{,}6\\text{ cm}$$" },
      ],
    },
  },
};

export default item;
