import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "algebra",
    topic: "functions",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$6$$",
        },
        {
          correct: false,
          label: "$$\\frac{20}{3}$$",
        },
        {
          correct: false,
          label: "$$8$$",
        },
        {
          correct: true,
          label: "$$\\frac{22}{3}$$",
        },
        {
          correct: false,
          label: "$$\\frac{26}{3}$$",
        },
      ],
    },
  },
};

export default item;
