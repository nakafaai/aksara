import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$16\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$24\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$100\\text{ cm}^2$$",
        },
        {
          correct: true,
          label: "$$96\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$384\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$40\\text{ cm}^2$$",
        },
      ],
    },
  },
};

export default item;
