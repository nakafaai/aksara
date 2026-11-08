import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "data-probability",
    topic: "data",
  },
  stimulus: "coffee-sales",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$5$$",
        },
        {
          correct: false,
          label: "$$15$$",
        },
        {
          correct: false,
          label: "$$20$$",
        },
        {
          correct: false,
          label: "$$8$$",
        },
        {
          correct: true,
          label: "$$10$$",
        },
      ],
    },
  },
};

export default item;
