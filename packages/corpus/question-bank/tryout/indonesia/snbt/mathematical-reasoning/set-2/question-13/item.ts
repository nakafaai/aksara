import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$1{,}2$$ menit",
        },
        {
          isCorrect: true,
          label: "$$16{,}8$$ menit",
        },
        {
          isCorrect: false,
          label: "$$4{,}8$$ menit",
        },
        {
          isCorrect: false,
          label: "$$18{,}8$$ menit",
        },
        {
          isCorrect: false,
          label: "$$14{,}2$$ menit",
        },
      ],
    },
  },
};

export default item;
