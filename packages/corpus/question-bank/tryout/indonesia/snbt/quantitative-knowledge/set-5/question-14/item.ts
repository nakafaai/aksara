import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$13x + y - 15 = 0$$",
        },
        {
          correct: false,
          label: "$$-13x - y - 15 = 0$$",
        },
        {
          correct: false,
          label: "$$13x - y - 15 = 0$$",
        },
        {
          correct: false,
          label: "$$-13x + y - 15 = 0$$",
        },
        {
          correct: false,
          label: "$$13x + y - 37 = 0$$",
        },
      ],
    },
  },
};

export default item;
