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
          label: "$$16$$",
        },
        {
          correct: false,
          label: "$$24$$",
        },
        {
          correct: false,
          label: "$$25$$",
        },
        {
          correct: true,
          label: "$$20$$",
        },
      ],
    },
  },
};

export default item;
