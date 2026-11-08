import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$3\\sqrt5\\text{ cm}$$" },
        { correct: false, label: "$$6\\sqrt2\\text{ cm}$$" },
        { correct: true, label: "$$9\\text{ cm}$$" },
        { correct: false, label: "$$6\\sqrt3\\text{ cm}$$" },
        { correct: false, label: "$$15\\text{ cm}$$" },
      ],
    },
  },
};

export default item;
