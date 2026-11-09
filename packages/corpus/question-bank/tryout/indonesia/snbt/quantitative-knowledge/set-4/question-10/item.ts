import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "$$54\\text{ cm}^2$$" },
        { correct: false, label: "$$72\\text{ cm}^2$$" },
        { correct: false, label: "$$90\\text{ cm}^2$$" },
        { correct: false, label: "$$108\\text{ cm}^2$$" },
        { correct: false, label: "$$126\\text{ cm}^2$$" },
      ],
    },
  },
};

export default item;
