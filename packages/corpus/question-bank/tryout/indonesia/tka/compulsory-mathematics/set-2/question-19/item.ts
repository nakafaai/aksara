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
          correct: false,
          label: "$$9$$",
        },
        {
          correct: false,
          label: "$$13$$",
        },
        {
          correct: true,
          label: "$$20$$",
        },
        {
          correct: false,
          label: "$$21$$",
        },
        {
          correct: false,
          label: "$$37$$",
        },
      ],
    },
  },
};

export default item;
