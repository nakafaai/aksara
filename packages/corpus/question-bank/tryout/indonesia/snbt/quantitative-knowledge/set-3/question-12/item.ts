import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$96\\text{ cm}^3$$" },
        { correct: false, label: "$$128\\text{ cm}^3$$" },
        { correct: true, label: "$$160\\text{ cm}^3$$" },
        { correct: false, label: "$$176\\text{ cm}^3$$" },
        { correct: false, label: "$$184\\text{ cm}^3$$" },
      ],
    },
  },
};

export default item;
