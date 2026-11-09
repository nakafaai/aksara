import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$1\\text{ m}$$" },
        { correct: true, label: "$$\\left(4\\sqrt3-5\\right)\\text{ m}$$" },
        { correct: false, label: "$$\\tfrac{12}{5}\\text{ m}$$" },
        { correct: false, label: "$$\\sqrt{23}\\text{ m}$$" },
        { correct: false, label: "$$4\\sqrt3\\text{ m}$$" },
      ],
    },
  },
};

export default item;
