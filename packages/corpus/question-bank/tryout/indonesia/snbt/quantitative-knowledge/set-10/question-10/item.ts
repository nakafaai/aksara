import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$3\\text{ cm}$$" },
        { correct: true, label: "$$6\\text{ cm}$$" },
        { correct: false, label: "$$7\\text{ cm}$$" },
        { correct: false, label: "$$12\\text{ cm}$$" },
        { correct: false, label: "$$14{,}5\\text{ cm}$$" },
      ],
    },
  },
};

export default item;
