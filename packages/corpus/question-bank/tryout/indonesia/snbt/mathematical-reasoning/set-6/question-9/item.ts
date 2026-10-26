import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$y = x^2 + 150x + 60{.}000$$",
        },
        {
          correct: false,
          label: "$$y = -x^2 + 150x + 60{.}000$$",
        },
        {
          correct: false,
          label: "$$y = -x^2 - 150x + 60{.}000$$",
        },
        {
          correct: false,
          label: "$$y = x^2 - 150x + 60{.}000$$",
        },
        {
          correct: false,
          label: "$$y = x^2 + 200x + 60{.}000$$",
        },
      ],
    },
  },
};

export default item;
