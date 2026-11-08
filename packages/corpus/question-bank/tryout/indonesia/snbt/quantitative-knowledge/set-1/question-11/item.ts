import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$3\\text{ cm}$$" },
        { correct: false, label: "$$4\\text{ cm}$$" },
        { correct: true, label: "$$5\\text{ cm}$$" },
        { correct: false, label: "$$4\\sqrt2\\text{ cm}$$" },
        { correct: false, label: "$$8\\text{ cm}$$" },
      ],
    },
  },
};

export default item;
