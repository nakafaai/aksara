import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "data-probability",
    topic: "probability",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\frac37$$",
        },
        {
          correct: false,
          label: "$$\\frac12$$",
        },
        {
          correct: false,
          label: "$$\\frac{15}{28}$$",
        },
        {
          correct: true,
          label: "$$\\frac{13}{28}$$",
        },
        {
          correct: false,
          label: "$$\\frac47$$",
        },
      ],
    },
  },
};

export default item;
