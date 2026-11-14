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
          label: "$$\\left(30\\pi+9\\sqrt{3}\\right)\\text{ m}^2$$",
        },
        {
          correct: true,
          label: "$$\\left(24\\pi+9\\sqrt{3}\\right)\\text{ m}^2$$",
        },
        {
          correct: false,
          label: "$$24\\pi\\text{ m}^2$$",
        },
        {
          correct: false,
          label: "$$\\left(24\\pi-9\\sqrt{3}\\right)\\text{ m}^2$$",
        },
        {
          correct: false,
          label: "$$\\left(12\\pi-9\\sqrt{3}\\right)\\text{ m}^2$$",
        },
      ],
    },
  },
};

export default item;
