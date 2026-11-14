import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$7$$" },
        { correct: true, label: "$$\\dfrac{29}{4}$$" },
        { correct: false, label: "$$\\dfrac{49}{4}$$" },
        { correct: false, label: "$$\\dfrac{29}{2}$$" },
        { correct: false, label: "$$\\dfrac{69}{4}$$" },
      ],
    },
  },
};

export default item;
