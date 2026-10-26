import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$12$$",
        },
        {
          correct: false,
          label: "$$20$$",
        },
        {
          correct: true,
          label: "$$16$$",
        },
        {
          correct: false,
          label: "$$24$$",
        },
        {
          correct: false,
          label: "$$32$$",
        },
      ],
    },
  },
};

export default item;
