import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$90$$",
        },
        {
          correct: false,
          label: "$$80$$",
        },
        {
          correct: false,
          label: "$$70$$",
        },
        {
          correct: false,
          label: "$$65$$",
        },
        {
          correct: true,
          label: "$$45$$",
        },
      ],
    },
  },
};

export default item;
