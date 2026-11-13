import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$2\\sqrt5$$" },
        { correct: false, label: "$$6$$" },
        { correct: true, label: "$$10$$" },
        { correct: false, label: "$$2\\sqrt{10}+2\\sqrt{13}$$" },
        { correct: false, label: "$$\\sqrt{65}+\\sqrt{89}$$" },
      ],
    },
  },
};

export default item;
