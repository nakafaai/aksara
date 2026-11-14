import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\{-1,1\\}$$" },
        { correct: false, label: "$$\\varnothing$$" },
        { correct: false, label: "$$\\{2\\}$$" },
        { correct: false, label: "$$\\left\\{\\dfrac52\\right\\}$$" },
        { correct: true, label: "$$\\left\\{2,\\dfrac52\\right\\}$$" },
      ],
    },
  },
};

export default item;
