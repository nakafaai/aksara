import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$32$$",
        },
        {
          correct: false,
          label: "$$48$$",
        },
        {
          correct: false,
          label: "$$96$$",
        },
        {
          correct: false,
          label: "$$128$$",
        },
        {
          correct: true,
          label: "$$64$$",
        },
      ],
    },
  },
};

export default item;
