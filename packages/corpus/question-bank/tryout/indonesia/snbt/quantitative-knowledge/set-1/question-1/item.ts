import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$11$$" },
        { correct: false, label: "$$25$$" },
        { correct: true, label: "$$56$$" },
        { correct: false, label: "$$59$$" },
        { correct: false, label: "$$119$$" },
      ],
    },
  },
};

export default item;
