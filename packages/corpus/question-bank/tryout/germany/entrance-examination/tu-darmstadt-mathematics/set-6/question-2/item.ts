import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "nur $$x=4$$",
        },
        {
          correct: true,
          label: "$$x=-3$$ oder $$x=4$$",
        },
        {
          correct: false,
          label: "nur $$x=-3$$",
        },
        {
          correct: false,
          label: "$$x=-4$$ oder $$x=3$$",
        },
        {
          correct: false,
          label: "alle $$x$$ mit $$-2\\le x\\le3$$",
        },
        {
          correct: false,
          label: "Es gibt keine solche Zahl $$x$$.",
        },
      ],
    },
  },
};

export default item;
