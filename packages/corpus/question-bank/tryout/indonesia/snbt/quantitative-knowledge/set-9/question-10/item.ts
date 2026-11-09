import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$12\\text{ cm}^2$$" },
        { correct: false, label: "$$20\\text{ cm}^2$$" },
        { correct: false, label: "$$34\\text{ cm}^2$$" },
        { correct: true, label: "$$42\\text{ cm}^2$$" },
        { correct: false, label: "$$50\\text{ cm}^2$$" },
      ],
    },
  },
};

export default item;
