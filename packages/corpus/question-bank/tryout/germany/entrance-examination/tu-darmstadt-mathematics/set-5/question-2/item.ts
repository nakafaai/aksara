import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$x=4$$",
        },
        {
          correct: false,
          label: "$$x=-4$$",
        },
        {
          correct: false,
          label: "$$x=9$$",
        },
        {
          correct: false,
          label: "$$x=-7$$",
        },
        {
          correct: false,
          label: "$$x=7$$",
        },
        {
          correct: false,
          label: "$$x=-3$$",
        },
      ],
    },
  },
};

export default item;
