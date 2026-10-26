import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$64{,}89$$",
        },
        {
          correct: false,
          label: "$$64$$",
        },
        {
          correct: false,
          label: "$$65{,}09$$",
        },
        {
          correct: false,
          label: "$$65{,}20$$",
        },
        {
          correct: false,
          label: "$$65{,}34$$",
        },
      ],
    },
  },
};

export default item;
