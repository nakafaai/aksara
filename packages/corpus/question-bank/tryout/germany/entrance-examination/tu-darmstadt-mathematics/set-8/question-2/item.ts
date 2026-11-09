import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$c=9$$",
        },
        {
          correct: false,
          label: "$$c=19$$",
        },
        {
          correct: false,
          label: "$$c=38$$",
        },
        {
          correct: false,
          label: "$$c=6$$",
        },
        {
          correct: false,
          label: "$$c=4$$",
        },
        {
          correct: false,
          label: "$$c=13$$",
        },
      ],
    },
  },
};

export default item;
