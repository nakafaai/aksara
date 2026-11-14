import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "$$P(-1)=7$$" },
        { correct: false, label: "$$P(0)=0$$" },
        { correct: false, label: "$$P(5)=14$$" },
        { correct: false, label: "$$P(6)=6$$" },
        { correct: false, label: "$$P(7)=0$$" },
      ],
    },
  },
};

export default item;
