import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$x=1$$ und $$x=5$$",
        },
        {
          correct: false,
          label: "nur $$x=5$$",
        },
        {
          correct: false,
          label: "nur $$x=1$$",
        },
        {
          correct: false,
          label: "$$x=0$$ und $$x=5$$",
        },
        {
          correct: false,
          label: "nur $$x=2$$",
        },
        {
          correct: false,
          label: "$$x=1$$ und $$x=2$$",
        },
      ],
    },
  },
};

export default item;
