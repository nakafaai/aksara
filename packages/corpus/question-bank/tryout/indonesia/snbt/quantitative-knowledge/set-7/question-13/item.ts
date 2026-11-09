import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\sqrt3:1$$" },
        { correct: false, label: "$$3:1$$" },
        { correct: true, label: "$$3\\sqrt3:1$$" },
        { correct: false, label: "$$9:1$$" },
        { correct: false, label: "$$27:1$$" },
      ],
    },
  },
};

export default item;
