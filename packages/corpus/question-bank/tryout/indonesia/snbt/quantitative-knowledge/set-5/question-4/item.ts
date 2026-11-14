import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "$$\\dfrac{13}{2}$$" },
        { correct: false, label: "$$6$$" },
        { correct: false, label: "$$\\dfrac92$$" },
        { correct: false, label: "$$\\dfrac72$$" },
        { correct: false, label: "$$3$$" },
      ],
    },
  },
};

export default item;
