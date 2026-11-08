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
          label: "$$375{.}000$$ liter",
        },
        {
          correct: false,
          label: "$$250{.}000$$ liter",
        },
        {
          correct: false,
          label: "$$500{.}000$$ liter",
        },
        {
          correct: false,
          label: "$$750{.}000$$ liter",
        },
        {
          correct: false,
          label: "$$3{.}750{.}000$$ liter",
        },
      ],
    },
  },
};

export default item;
