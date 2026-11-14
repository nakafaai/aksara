import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\dfrac{55}{4}$$" },
        { correct: false, label: "$$9$$" },
        { correct: false, label: "$$\\dfrac{49}{6}$$" },
        { correct: true, label: "$$\\dfrac{15}{2}$$" },
        { correct: false, label: "$$\\dfrac{35}{6}$$" },
      ],
    },
  },
};

export default item;
