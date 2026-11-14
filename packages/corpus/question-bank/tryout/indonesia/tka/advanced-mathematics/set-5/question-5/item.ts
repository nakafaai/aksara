import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "algebra",
    topic: "matrices",
  },
  stimulus: "chips-cooperative",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$21$$",
        },
        {
          correct: false,
          label: "$$2$$",
        },
        {
          correct: false,
          label: "$$20$$",
        },
        {
          correct: false,
          label: "$$1$$",
        },
        {
          correct: false,
          label: "$$51$$",
        },
      ],
    },
  },
};

export default item;
