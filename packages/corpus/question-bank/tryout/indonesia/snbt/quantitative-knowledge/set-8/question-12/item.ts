import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$6{,}25$$",
        },
        {
          correct: false,
          label: "$$6{,}50$$",
        },
        {
          correct: false,
          label: "$$7{,}50$$",
        },
        {
          correct: true,
          label: "$$8{,}25$$",
        },
        {
          correct: false,
          label: "$$7{,}75$$",
        },
      ],
    },
  },
};

export default item;
