import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$2x+3y-13=0$$" },
        { correct: false, label: "$$3x+2y-12=0$$" },
        { correct: false, label: "$$3x-2y=0$$" },
        { correct: false, label: "$$2x-3y-5=0$$" },
        { correct: true, label: "$$2x-3y+5=0$$" },
      ],
    },
  },
};

export default item;
