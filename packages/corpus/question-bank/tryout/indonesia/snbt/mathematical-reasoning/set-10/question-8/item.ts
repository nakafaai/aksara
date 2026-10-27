import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$12:13$$",
        },
        {
          correct: false,
          label: "$$13:14$$",
        },
        {
          correct: false,
          label: "$$7:6$$",
        },
        {
          correct: true,
          label: "$$14:13$$",
        },
        {
          correct: false,
          label: "$$15:13$$",
        },
      ],
    },
  },
};

export default item;
