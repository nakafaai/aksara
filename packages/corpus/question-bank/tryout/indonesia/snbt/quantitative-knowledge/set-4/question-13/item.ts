import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$60$$",
        },
        {
          correct: false,
          label: "$$32$$",
        },
        {
          correct: false,
          label: "$$128$$",
        },
        {
          correct: false,
          label: "$$256$$",
        },
        {
          correct: false,
          label: "$$512$$",
        },
      ],
    },
  },
};

export default item;
