import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  stimulus: "camp-tent",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$16\\text{ m}^2$$",
        },
        {
          correct: false,
          label: "$$20\\text{ m}^2$$",
        },
        {
          correct: false,
          label: "$$22\\text{ m}^2$$",
        },
        {
          correct: false,
          label: "$$23\\text{ m}^2$$",
        },
        {
          correct: true,
          label: "$$26\\text{ m}^2$$",
        },
      ],
    },
  },
};

export default item;
