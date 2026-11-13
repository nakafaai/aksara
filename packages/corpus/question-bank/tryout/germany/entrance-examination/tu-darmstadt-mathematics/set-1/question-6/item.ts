import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$m=3$$",
        },
        {
          correct: false,
          label: "$$m=5$$ oder $$m=-5$$",
        },
        {
          correct: false,
          label: "$$m=2$$ oder $$m=-6$$",
        },
        {
          correct: true,
          label: "$$m=3$$ oder $$m=-7$$",
        },
        {
          correct: false,
          label: "$$m=7$$ oder $$m=-3$$",
        },
        {
          correct: false,
          label: "$$m=-7$$",
        },
      ],
    },
  },
};

export default item;
