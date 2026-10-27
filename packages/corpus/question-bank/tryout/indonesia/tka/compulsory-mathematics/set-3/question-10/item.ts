import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "geometry-measurement",
    topic: "geometry-objects",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$13$$",
        },
        {
          correct: false,
          label: "$$17$$",
        },
        {
          correct: false,
          label: "$$29$$",
        },
        {
          correct: true,
          label: "$$25$$",
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
