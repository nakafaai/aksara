import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$\\text{I dan II}$$",
        },
        {
          correct: false,
          label: "$$\\text{I, II, dan III}$$",
        },
        {
          correct: false,
          label: "$$\\text{II dan III}$$",
        },
        {
          correct: false,
          label: "$$\\text{I}$$",
        },
        {
          correct: false,
          label: "$$\\text{III}$$",
        },
      ],
    },
  },
};

export default item;
