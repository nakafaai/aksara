import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$19:12$$",
        },
        {
          correct: false,
          label: "$$12:19$$",
        },
        {
          correct: false,
          label: "$$19:11$$",
        },
        {
          correct: false,
          label: "$$38:25$$",
        },
        {
          correct: false,
          label: "$$7:4$$",
        },
      ],
    },
  },
};

export default item;
