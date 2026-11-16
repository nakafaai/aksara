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
          label: "$$1:5$$",
        },
        {
          correct: true,
          label: "$$9:25$$",
        },
        {
          correct: false,
          label: "$$49:625$$",
        },
        {
          correct: false,
          label: "$$16:25$$",
        },
        {
          correct: false,
          label: "$$3:5$$",
        },
      ],
    },
  },
};

export default item;
