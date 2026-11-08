import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$8\\text{ dm}$$",
        },
        {
          correct: false,
          label: "$$13\\text{ dm}$$",
        },
        {
          correct: false,
          label: "$$15\\text{ dm}$$",
        },
        {
          correct: true,
          label: "$$17\\text{ dm}$$",
        },
        {
          correct: false,
          label: "$$23\\text{ dm}$$",
        },
        {
          correct: false,
          label: "$$289\\text{ dm}$$",
        },
      ],
    },
  },
};

export default item;
