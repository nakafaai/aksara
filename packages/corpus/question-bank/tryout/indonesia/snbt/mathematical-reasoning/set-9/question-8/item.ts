import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$3:7$$",
        },
        {
          correct: false,
          label: "$$9:14$$",
        },
        {
          correct: true,
          label: "$$19:21$$",
        },
        {
          correct: false,
          label: "$$21:19$$",
        },
        {
          correct: false,
          label: "$$7:3$$",
        },
      ],
    },
  },
};

export default item;
