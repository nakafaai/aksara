import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\dfrac32$$" },
        { correct: false, label: "$$2$$" },
        { correct: false, label: "$$\\dfrac52$$" },
        { correct: true, label: "$$3$$" },
        { correct: false, label: "$$\\dfrac72$$" },
      ],
    },
  },
};

export default item;
