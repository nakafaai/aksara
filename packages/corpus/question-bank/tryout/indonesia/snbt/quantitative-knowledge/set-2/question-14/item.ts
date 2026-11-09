import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "$$\\sqrt{13}$$" },
        { correct: false, label: "$$\\tfrac12\\sqrt{53}$$" },
        { correct: false, label: "$$5$$" },
        { correct: false, label: "$$\\sqrt{26}$$" },
        { correct: false, label: "$$15$$" },
      ],
    },
  },
};

export default item;
