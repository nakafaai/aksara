import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$12{,}25\\%$$",
        },
        {
          correct: false,
          label: "$$14{,}50\\%$$",
        },
        {
          correct: false,
          label: "$$15{,}00\\%$$",
        },
        {
          correct: false,
          label: "$$15{,}75\\%$$",
        },
        {
          correct: true,
          label: "$$13{,}75\\%$$",
        },
      ],
    },
  },
};

export default item;
