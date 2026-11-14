import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\dfrac{3}{2}$$" },
        { correct: false, label: "$$\\dfrac{12}{5}$$" },
        { correct: false, label: "$$\\dfrac{15}{4}$$" },
        { correct: true, label: "$$4$$" },
        { correct: false, label: "$$5$$" },
      ],
    },
  },
};

export default item;
