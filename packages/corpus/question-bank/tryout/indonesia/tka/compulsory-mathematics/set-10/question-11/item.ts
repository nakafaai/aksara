import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "geometry-objects",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$110\\pi\\text{ m}^2$$",
        },
        {
          correct: false,
          label: "$$80\\pi\\text{ m}^2$$",
        },
        {
          correct: false,
          label: "$$73\\pi\\text{ m}^2$$",
        },
        {
          correct: false,
          label: "$$64\\pi\\text{ m}^2$$",
        },
        {
          correct: true,
          label: "$$55\\pi\\text{ m}^2$$",
        },
      ],
    },
  },
};

export default item;
