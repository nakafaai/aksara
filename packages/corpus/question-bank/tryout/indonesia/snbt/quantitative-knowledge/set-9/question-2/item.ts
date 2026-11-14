import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$3x^2+36x+16=0$$" },
        { correct: false, label: "$$3x^2-12x+16=0$$" },
        { correct: false, label: "$$3x^2-18x+16=0$$" },
        { correct: false, label: "$$3x^2-27x+16=0$$" },
        { correct: true, label: "$$3x^2-36x+16=0$$" },
      ],
    },
  },
};

export default item;
