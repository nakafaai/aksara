import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  stimulus: "aquarium",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$11{,}2$$ liter",
        },
        {
          correct: false,
          label: "$$48$$ liter",
        },
        {
          correct: true,
          label: "$$112$$ liter",
        },
        {
          correct: false,
          label: "$$160$$ liter",
        },
        {
          correct: false,
          label: "$$1{.}120$$ liter",
        },
      ],
    },
  },
};

export default item;
