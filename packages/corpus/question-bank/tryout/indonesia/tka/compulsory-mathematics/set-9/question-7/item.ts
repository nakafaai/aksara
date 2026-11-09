import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "algebra",
    topic: "functions",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$30$$",
        },
        {
          correct: true,
          label: "$$60$$",
        },
        {
          correct: false,
          label: "$$84$$",
        },
        {
          correct: false,
          label: "$$120$$",
        },
        {
          correct: false,
          label: "$$150$$",
        },
      ],
    },
  },
};

export default item;
