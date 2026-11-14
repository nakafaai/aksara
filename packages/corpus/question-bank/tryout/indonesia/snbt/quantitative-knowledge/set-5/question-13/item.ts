import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$12\\sqrt7\\text{ cm}^3$$" },
        { correct: true, label: "$$48\\text{ cm}^3$$" },
        { correct: false, label: "$$60\\text{ cm}^3$$" },
        { correct: false, label: "$$12\\sqrt{55}\\text{ cm}^3$$" },
        { correct: false, label: "$$144\\text{ cm}^3$$" },
      ],
    },
  },
};

export default item;
