import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "$$1{.}800$$" },
        { correct: false, label: "$$2{.}520$$" },
        { correct: false, label: "$$3{.}600$$" },
        { correct: false, label: "$$7{.}200$$" },
        { correct: false, label: "$$10{.}800$$" },
      ],
    },
  },
};

export default item;
