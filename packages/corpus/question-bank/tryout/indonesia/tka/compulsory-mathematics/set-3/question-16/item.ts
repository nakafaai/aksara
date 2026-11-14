import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  stimulus: "tangga",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$4{,}554\\text{ m}^3$$",
        },
        {
          correct: true,
          label: "$$4{,}14\\text{ m}^3$$",
        },
        {
          correct: false,
          label: "$$3{,}3\\text{ m}^3$$",
        },
        {
          correct: false,
          label: "$$2{,}94\\text{ m}^3$$",
        },
        {
          correct: false,
          label: "$$2{,}7\\text{ m}^3$$",
        },
      ],
    },
  },
};

export default item;
