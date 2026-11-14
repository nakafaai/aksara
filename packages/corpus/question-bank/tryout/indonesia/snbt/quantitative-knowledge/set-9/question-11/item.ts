import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$1{.}080$$" },
        { correct: false, label: "$$1{.}120$$" },
        { correct: false, label: "$$1{.}200$$" },
        { correct: true, label: "$$1{.}680$$" },
        { correct: false, label: "$$2{.}160$$" },
      ],
    },
  },
};

export default item;
