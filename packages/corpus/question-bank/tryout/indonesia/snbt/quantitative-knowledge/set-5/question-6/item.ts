import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "$$x^2-7x+1=0$$" },
        { correct: false, label: "$$x^2-9x+1=0$$" },
        { correct: false, label: "$$x^2-11x+1=0$$" },
        { correct: false, label: "$$x^2+7x+1=0$$" },
        { correct: false, label: "$$x^2-7x+2=0$$" },
      ],
    },
  },
};

export default item;
