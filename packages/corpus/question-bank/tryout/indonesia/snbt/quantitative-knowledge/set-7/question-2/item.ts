import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$y = 2x - 4$$",
        },
        {
          correct: false,
          label: "$$y = -2x - 2$$",
        },
        {
          correct: false,
          label: "$$y = -2x + 4$$",
        },
        {
          correct: true,
          label: "$$y = 2x + 12$$",
        },
        {
          correct: false,
          label: "$$y = -2x + 12$$",
        },
      ],
    },
  },
};

export default item;
