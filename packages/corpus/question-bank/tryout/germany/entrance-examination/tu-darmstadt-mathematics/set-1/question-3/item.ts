import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "nur $$x=2$$",
        },
        {
          correct: false,
          label: "$$x=\\frac12$$ und $$x=-2$$",
        },
        {
          correct: false,
          label: "$$x=-1$$ und $$x=2$$",
        },
        {
          correct: false,
          label: "$$x=1$$ und $$x=-2$$",
        },
        {
          correct: false,
          label: "Die Gleichung hat keine reelle Lösung.",
        },
        {
          correct: true,
          label: "$$x=-\\frac12$$ und $$x=2$$",
        },
      ],
    },
  },
};

export default item;
