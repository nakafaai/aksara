import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$350$$",
        },
        {
          correct: true,
          label: "$$250$$",
        },
        {
          correct: false,
          label: "$$150$$",
        },
        {
          correct: false,
          label: "$$100$$",
        },
        {
          correct: false,
          label: "$$75$$",
        },
      ],
    },
  },
};

export default item;
