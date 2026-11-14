import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$a=-3$$ und $$b=-5$$",
        },
        {
          correct: false,
          label: "$$a=3$$ und $$b=5$$",
        },
        {
          correct: false,
          label: "$$a=6$$ und $$b=4$$",
        },
        {
          correct: false,
          label: "$$a=3$$ und $$b=-1$$",
        },
        {
          correct: true,
          label: "$$a=3$$ und $$b=1$$",
        },
        {
          correct: false,
          label: "$$a=1$$ und $$b=3$$",
        },
      ],
    },
  },
};

export default item;
