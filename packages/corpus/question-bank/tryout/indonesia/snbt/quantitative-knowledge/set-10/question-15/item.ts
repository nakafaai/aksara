import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$16, -1$$",
        },
        {
          correct: false,
          label: "$$12, -1$$",
        },
        {
          correct: false,
          label: "$$-2, 12$$",
        },
        {
          correct: false,
          label: "$$12, 16$$",
        },
        {
          correct: false,
          label: "$$-1, -2$$",
        },
      ],
    },
  },
};

export default item;
