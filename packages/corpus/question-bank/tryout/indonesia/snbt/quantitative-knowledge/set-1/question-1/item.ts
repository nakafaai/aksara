import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$729$$" },
        { correct: false, label: "$$769$$" },
        { correct: true, label: "$$789$$" },
        { correct: false, label: "$$907$$" },
        { correct: false, label: "$$1{.}031$$" },
      ],
    },
  },
};

export default item;
