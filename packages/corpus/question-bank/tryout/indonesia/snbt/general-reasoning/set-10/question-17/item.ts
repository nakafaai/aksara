import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$4:7$$",
        },
        {
          correct: true,
          label: "$$27:28$$",
        },
        {
          correct: false,
          label: "$$5:7$$",
        },
        {
          correct: false,
          label: "$$28:27$$",
        },
        {
          correct: false,
          label: "$$7:4$$",
        },
      ],
    },
  },
};

export default item;
