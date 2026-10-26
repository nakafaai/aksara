import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$750$$",
        },
        {
          correct: true,
          label: "$$800$$",
        },
        {
          correct: false,
          label: "$$780$$",
        },
        {
          correct: false,
          label: "$$820$$",
        },
        {
          correct: false,
          label: "$$850$$",
        },
      ],
    },
  },
};

export default item;
