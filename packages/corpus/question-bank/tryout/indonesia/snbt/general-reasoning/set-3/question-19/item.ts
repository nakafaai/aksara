import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$300$$",
        },
        {
          correct: false,
          label: "$$150$$",
        },
        {
          correct: true,
          label: "$$100$$",
        },
        {
          correct: false,
          label: "$$75$$",
        },
        {
          correct: false,
          label: "$$50$$",
        },
      ],
    },
  },
};

export default item;
