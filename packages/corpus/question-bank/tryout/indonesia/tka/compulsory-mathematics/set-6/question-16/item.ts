import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
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
          label: "$$6\\text{ m}^3$$",
        },
        {
          correct: true,
          label: "$$12\\text{ m}^3$$",
        },
        {
          correct: false,
          label: "$$15\\text{ m}^3$$",
        },
        {
          correct: false,
          label: "$$24\\text{ m}^3$$",
        },
        {
          correct: false,
          label: "$$30\\text{ m}^3$$",
        },
      ],
    },
  },
};

export default item;
