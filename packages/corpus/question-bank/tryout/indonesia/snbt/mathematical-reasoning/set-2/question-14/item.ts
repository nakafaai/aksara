import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$3{,}6$$ menit",
        },
        {
          isCorrect: false,
          label: "$$7{,}2$$ menit",
        },
        {
          isCorrect: false,
          label: "$$7{,}8$$ menit",
        },
        {
          isCorrect: false,
          label: "$$8{,}0$$ menit",
        },
        {
          isCorrect: true,
          label: "$$4{,}8$$ menit",
        },
      ],
    },
  },
};

export default item;
