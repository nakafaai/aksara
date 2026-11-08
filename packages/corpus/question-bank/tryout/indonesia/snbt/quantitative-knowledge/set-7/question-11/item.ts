import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$32\\pi\\text{ cm}^2$$" },
        { correct: true, label: "$$64\\pi\\text{ cm}^2$$" },
        { correct: false, label: "$$128\\pi\\text{ cm}^2$$" },
        { correct: false, label: "$$192\\pi\\text{ cm}^2$$" },
        { correct: false, label: "$$256\\pi\\text{ cm}^2$$" },
      ],
    },
  },
};

export default item;
