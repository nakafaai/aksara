import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$x^2+32x+11=0$$" },
        { correct: false, label: "$$x^2+4x-1=0$$" },
        { correct: false, label: "$$x^2-4x+11=0$$" },
        { correct: false, label: "$$x^2-5x-5=0$$" },
        { correct: true, label: "$$x^2-4x-1=0$$" },
      ],
    },
  },
};

export default item;
