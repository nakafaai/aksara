import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$x=7$$",
        },
        {
          correct: false,
          label: "$$x=\\frac{70}{3}$$",
        },
        {
          correct: false,
          label: "$$x=14$$",
        },
        {
          correct: true,
          label: "$$x=10$$",
        },
        {
          correct: false,
          label: "$$x=12{,}5$$",
        },
        {
          correct: false,
          label: "$$x=22$$",
        },
      ],
    },
  },
};

export default item;
