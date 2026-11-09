import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$12\\text{ cm}^2$$" },
        { correct: false, label: "$$24\\text{ cm}^2$$" },
        { correct: false, label: "$$30\\text{ cm}^2$$" },
        { correct: true, label: "$$36\\text{ cm}^2$$" },
        { correct: false, label: "$$44\\text{ cm}^2$$" },
      ],
    },
  },
};

export default item;
