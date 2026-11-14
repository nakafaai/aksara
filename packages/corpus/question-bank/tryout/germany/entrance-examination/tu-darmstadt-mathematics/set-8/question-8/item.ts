import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$3{.}125$$",
        },
        {
          correct: false,
          label: "$$\\frac{1}{3{.}125}$$",
        },
        {
          correct: true,
          label: "$$5$$",
        },
        {
          correct: false,
          label: "$$125$$",
        },
        {
          correct: false,
          label: "$$-0{,}024$$",
        },
        {
          correct: false,
          label: "$$25$$",
        },
      ],
    },
  },
};

export default item;
