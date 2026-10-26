import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$55$$",
        },
        {
          correct: false,
          label: "$$60$$",
        },
        {
          correct: true,
          label: "$$65$$",
        },
        {
          correct: false,
          label: "$$70$$",
        },
        {
          correct: false,
          label: "$$75$$",
        },
      ],
    },
  },
};

export default item;
