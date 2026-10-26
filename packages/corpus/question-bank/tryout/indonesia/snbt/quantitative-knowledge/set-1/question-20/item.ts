import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$-12$$",
        },
        {
          correct: false,
          label: "$$-6$$",
        },
        {
          correct: true,
          label: "$$12$$",
        },
        {
          correct: false,
          label: "$$6$$",
        },
        {
          correct: false,
          label: "$$18$$",
        },
      ],
    },
  },
};

export default item;
