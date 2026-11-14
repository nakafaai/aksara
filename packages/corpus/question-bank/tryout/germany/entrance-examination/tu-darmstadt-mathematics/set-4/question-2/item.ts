import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$x=19$$",
        },
        {
          correct: false,
          label: "$$x=-9$$",
        },
        {
          correct: false,
          label: "$$x=-14$$",
        },
        {
          correct: false,
          label: "$$x=35$$",
        },
        {
          correct: true,
          label: "$$x=13$$",
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
