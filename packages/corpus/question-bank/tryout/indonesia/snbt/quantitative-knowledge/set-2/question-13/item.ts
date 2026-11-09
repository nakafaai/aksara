import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$12\\pi\\text{ cm}^3$$" },
        { correct: false, label: "$$48\\pi\\text{ cm}^3$$" },
        { correct: false, label: "$$72\\pi\\text{ cm}^3$$" },
        { correct: true, label: "$$84\\pi\\text{ cm}^3$$" },
        { correct: false, label: "$$96\\pi\\text{ cm}^3$$" },
      ],
    },
  },
};

export default item;
