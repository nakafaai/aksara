import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$10$$",
        },
        {
          correct: true,
          label: "$$34$$",
        },
        {
          correct: false,
          label: "$$20$$",
        },
        {
          correct: false,
          label: "$$24$$",
        },
        {
          correct: false,
          label: "$$44$$",
        },
      ],
    },
  },
};

export default item;
