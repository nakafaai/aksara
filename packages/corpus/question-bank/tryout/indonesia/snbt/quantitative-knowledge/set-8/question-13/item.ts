import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$36\\text{ cm}^3$$" },
        { correct: false, label: "$$72\\text{ cm}^3$$" },
        { correct: false, label: "$$108\\text{ cm}^3$$" },
        { correct: false, label: "$$144\\text{ cm}^3$$" },
        { correct: true, label: "$$180\\text{ cm}^3$$" },
      ],
    },
  },
};

export default item;
