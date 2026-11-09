import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$20{.}000$$" },
        { correct: false, label: "$$21{.}000$$" },
        { correct: false, label: "$$22{.}000$$" },
        { correct: false, label: "$$24{.}000$$" },
        { correct: true, label: "$$24{.}200$$" },
      ],
    },
  },
};

export default item;
