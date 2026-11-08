import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$0{,}5\\text{ cm}$$" },
        { correct: false, label: "$$1\\text{ cm}$$" },
        { correct: false, label: "$$1{,}5\\text{ cm}$$" },
        { correct: false, label: "$$5{,}5\\text{ cm}$$" },
        { correct: true, label: "$$6\\text{ cm}$$" },
      ],
    },
  },
};

export default item;
