import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$2\\text{ cm}$$" },
        { correct: false, label: "$$\\dfrac72\\text{ cm}$$" },
        { correct: true, label: "$$2\\sqrt7\\text{ cm}$$" },
        { correct: false, label: "$$10\\text{ cm}$$" },
        { correct: false, label: "$$4\\sqrt7\\text{ cm}$$" },
      ],
    },
  },
};

export default item;
