import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$20$$",
        },
        {
          correct: false,
          label: "$$60$$",
        },
        {
          correct: true,
          label: "$$30$$",
        },
        {
          correct: false,
          label: "$$90$$",
        },
        {
          correct: false,
          label: "$$360$$",
        },
      ],
    },
  },
};

export default item;
