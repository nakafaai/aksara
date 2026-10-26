import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$1000$$",
        },
        {
          correct: false,
          label: "$$800$$",
        },
        {
          correct: true,
          label: "$$300$$",
        },
        {
          correct: false,
          label: "$$900$$",
        },
        {
          correct: false,
          label: "$$100$$",
        },
      ],
    },
  },
};

export default item;
