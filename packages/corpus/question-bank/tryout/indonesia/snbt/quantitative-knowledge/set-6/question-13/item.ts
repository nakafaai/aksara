import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$32\\pi\\text{ cm}^3$$" },
        { correct: true, label: "$$96\\pi\\text{ cm}^3$$" },
        { correct: false, label: "$$120\\pi\\text{ cm}^3$$" },
        { correct: false, label: "$$288\\pi\\text{ cm}^3$$" },
        { correct: false, label: "$$360\\pi\\text{ cm}^3$$" },
      ],
    },
  },
};

export default item;
