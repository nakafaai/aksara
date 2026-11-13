import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$98\\text{ m}^2$$",
        },
        {
          correct: false,
          label: "$$104\\text{ m}^2$$",
        },
        {
          correct: false,
          label: "$$110\\text{ m}^2$$",
        },
        {
          correct: false,
          label: "$$120\\text{ m}^2$$",
        },
        {
          correct: false,
          label: "$$144\\text{ m}^2$$",
        },
      ],
    },
  },
};

export default item;
