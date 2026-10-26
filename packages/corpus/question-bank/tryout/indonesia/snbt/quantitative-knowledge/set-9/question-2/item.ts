import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$144\\pi\\text{ cm}^2$$",
        },
        {
          correct: true,
          label: "$$225\\pi\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$256\\pi\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$336\\pi\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$425\\pi\\text{ cm}^2$$",
        },
      ],
    },
  },
};

export default item;
