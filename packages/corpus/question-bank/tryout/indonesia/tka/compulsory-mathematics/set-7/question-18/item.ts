import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$265\\text{ m}^2$$",
        },
        {
          correct: true,
          label: "$$266\\text{ m}^2$$",
        },
        {
          correct: false,
          label: "$$267\\text{ m}^2$$",
        },
        {
          correct: false,
          label: "$$280\\text{ m}^2$$",
        },
        {
          correct: false,
          label: "$$285\\text{ m}^2$$",
        },
      ],
    },
  },
};

export default item;
