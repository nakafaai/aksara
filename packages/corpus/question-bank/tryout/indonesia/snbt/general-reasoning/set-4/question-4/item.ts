import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$52{,}3\\text{ g}$$ dan $$10{,}85\\text{ g}$$",
        },
        {
          isCorrect: false,
          label: "$$52{,}3\\text{ g}$$ dan $$10{,}58\\text{ g}$$",
        },
        {
          isCorrect: true,
          label: "$$53{,}2\\text{ g}$$ dan $$10{,}85\\text{ g}$$",
        },
        {
          isCorrect: false,
          label: "$$53{,}2\\text{ g}$$ dan $$10{,}58\\text{ g}$$",
        },
        {
          isCorrect: false,
          label: "$$52{,}3\\text{ g}$$ dan $$10{,}50\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
