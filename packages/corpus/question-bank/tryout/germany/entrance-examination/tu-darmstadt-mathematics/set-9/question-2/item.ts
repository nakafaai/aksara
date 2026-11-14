import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "nur $$x=3$$",
        },
        {
          correct: false,
          label: "nur $$x=\\frac13$$",
        },
        {
          correct: false,
          label: "$$x=-3$$ und $$x=-\\frac13$$",
        },
        {
          correct: false,
          label: "$$x=\\frac{10}{3}$$",
        },
        {
          correct: false,
          label: "$$x=3$$ und $$x=-\\frac13$$",
        },
        {
          correct: true,
          label: "$$x=3$$ und $$x=\\frac13$$",
        },
      ],
    },
  },
};

export default item;
