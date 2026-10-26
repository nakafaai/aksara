import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$800$$",
        },
        {
          correct: false,
          label: "$$850$$",
        },
        {
          correct: true,
          label: "$$900$$",
        },
        {
          correct: false,
          label: "$$950$$",
        },
        {
          correct: false,
          label: "$$1000$$",
        },
      ],
    },
  },
};

export default item;
