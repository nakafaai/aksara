import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$30\\text{ cm}^2$$" },
        { correct: true, label: "$$60\\text{ cm}^2$$" },
        { correct: false, label: "$$65\\text{ cm}^2$$" },
        { correct: false, label: "$$120\\text{ cm}^2$$" },
        { correct: false, label: "$$130\\text{ cm}^2$$" },
      ],
    },
  },
};

export default item;
