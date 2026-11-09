import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$30\\text{ cm}^2$$" },
        { correct: false, label: "$$36\\text{ cm}^2$$" },
        { correct: false, label: "$$39\\text{ cm}^2$$" },
        { correct: true, label: "$$48\\text{ cm}^2$$" },
        { correct: false, label: "$$54\\text{ cm}^2$$" },
      ],
    },
  },
};

export default item;
