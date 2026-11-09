import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$3\\text{ cm}$$" },
        { correct: false, label: "$$4\\text{ cm}$$" },
        { correct: false, label: "$$4{,}5\\text{ cm}$$" },
        { correct: false, label: "$$5\\text{ cm}$$" },
        { correct: true, label: "$$6\\text{ cm}$$" },
      ],
    },
  },
};

export default item;
