import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$V$$",
        },
        {
          correct: false,
          label: "$$W$$",
        },
        {
          correct: false,
          label: "$$X$$",
        },
        {
          correct: true,
          label: "$$Y$$",
        },
        {
          correct: false,
          label: "$$Z$$",
        },
      ],
    },
  },
};

export default item;
