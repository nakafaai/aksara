import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  stimulus: "kamar",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$3{,}65$$ liter",
        },
        {
          correct: false,
          label: "$$5{,}5$$ liter",
        },
        {
          correct: false,
          label: "$$6{,}9$$ liter",
        },
        {
          correct: false,
          label: "$$7{,}14$$ liter",
        },
        {
          correct: true,
          label: "$$7{,}3$$ liter",
        },
      ],
    },
  },
};

export default item;
