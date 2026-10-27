import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$52{,}3\\text{ g}$$ dan $$10{,}85\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$52{,}3\\text{ g}$$ dan $$10{,}58\\text{ g}$$",
        },
        {
          correct: true,
          label: "$$53{,}2\\text{ g}$$ dan $$10{,}85\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$53{,}2\\text{ g}$$ dan $$10{,}58\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$52{,}3\\text{ g}$$ dan $$10{,}50\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
