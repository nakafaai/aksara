import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$2{,}5\\text{ cm}$$" },
        { correct: false, label: "$$5\\text{ cm}$$" },
        { correct: true, label: "$$7{,}5\\text{ cm}$$" },
        { correct: false, label: "$$15\\text{ cm}$$" },
        { correct: false, label: "$$22{,}5\\text{ cm}$$" },
      ],
    },
  },
};

export default item;
