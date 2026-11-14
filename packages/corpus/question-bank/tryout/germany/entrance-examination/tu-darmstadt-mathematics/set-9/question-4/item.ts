import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$100\\text{ m}^2$$",
        },
        {
          correct: false,
          label: "$$400\\text{ m}^2$$",
        },
        {
          correct: false,
          label: "$$150\\text{ m}^2$$",
        },
        {
          correct: true,
          label: "$$200\\text{ m}^2$$",
        },
        {
          correct: false,
          label: "$$800\\text{ m}^2$$",
        },
        {
          correct: false,
          label: "$$192\\text{ m}^2$$",
        },
      ],
    },
  },
};

export default item;
