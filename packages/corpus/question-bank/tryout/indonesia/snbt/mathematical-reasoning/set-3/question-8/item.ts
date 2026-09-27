import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$180$$ dan $$10$$",
        },
        {
          isCorrect: false,
          label: "$$170$$ dan $$15$$",
        },
        {
          isCorrect: true,
          label: "$$180$$ dan $$20$$",
        },
        {
          isCorrect: false,
          label: "$$170$$ dan $$20$$",
        },
        {
          isCorrect: false,
          label: "$$160$$ dan $$25$$",
        },
      ],
    },
  },
};

export default item;
