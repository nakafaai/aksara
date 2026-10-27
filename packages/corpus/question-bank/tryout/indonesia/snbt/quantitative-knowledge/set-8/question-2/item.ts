import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$18, 12$$",
        },
        {
          correct: false,
          label: "$$21, 15$$",
        },
        {
          correct: false,
          label: "$$20, 14$$",
        },
        {
          correct: false,
          label: "$$19, 13$$",
        },
        {
          correct: false,
          label: "$$18, 11$$",
        },
      ],
    },
  },
};

export default item;
