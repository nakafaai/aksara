import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  stimulus: "atap",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$115{,}2\\text{ m}^2$$",
        },
        {
          correct: false,
          label: "$$120\\text{ m}^2$$",
        },
        {
          correct: false,
          label: "$$132\\text{ m}^2$$",
        },
        {
          correct: false,
          label: "$$139{,}2\\text{ m}^2$$",
        },
        {
          correct: true,
          label: "$$144\\text{ m}^2$$",
        },
      ],
    },
  },
};

export default item;
