import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$7$$ bulan",
        },
        {
          isCorrect: false,
          label: "$$8$$ bulan",
        },
        {
          isCorrect: false,
          label: "$$9$$ bulan",
        },
        {
          isCorrect: false,
          label: "$$12$$ bulan",
        },
        {
          isCorrect: true,
          label: "$$10$$ bulan",
        },
      ],
    },
  },
};

export default item;
