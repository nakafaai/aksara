import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$x=5$$",
        },
        {
          correct: false,
          label: "$$x=7$$",
        },
        {
          correct: false,
          label: "$$x=4$$",
        },
        {
          correct: false,
          label: "$$x=43$$",
        },
        {
          correct: true,
          label: "$$x=6$$",
        },
        {
          correct: false,
          label: "$$x=3$$",
        },
      ],
    },
  },
};

export default item;
