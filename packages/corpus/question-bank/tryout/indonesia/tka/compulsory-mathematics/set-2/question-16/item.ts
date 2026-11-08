import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  stimulus: "swimming-pool",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$325{.}000$$ liter",
        },
        {
          correct: false,
          label: "$$300{.}000$$ liter",
        },
        {
          correct: false,
          label: "$$350{.}000$$ liter",
        },
        {
          correct: false,
          label: "$$375{.}000$$ liter",
        },
        {
          correct: false,
          label: "$$425{.}000$$ liter",
        },
      ],
    },
  },
};

export default item;
