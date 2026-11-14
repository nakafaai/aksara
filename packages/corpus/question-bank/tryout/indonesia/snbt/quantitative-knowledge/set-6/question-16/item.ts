import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "$$20$$" },
        { correct: false, label: "$$\\dfrac{81}{4}$$" },
        { correct: false, label: "$$25$$" },
        { correct: false, label: "$$26$$" },
        { correct: false, label: "$$28$$" },
      ],
    },
  },
};

export default item;
