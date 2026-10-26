import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$y = -x + 1$$",
        },
        {
          correct: false,
          label: "$$y = 2x - 1$$",
        },
        {
          correct: true,
          label: "$$y = x + 1$$",
        },
        {
          correct: false,
          label: "$$y = 2x + 1$$",
        },
        {
          correct: false,
          label: "$$y = 2x + 2$$",
        },
      ],
    },
  },
};

export default item;
