import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$5$$ bulan",
        },
        {
          isCorrect: false,
          label: "$$6$$ bulan",
        },
        {
          isCorrect: true,
          label: "$$4$$ bulan",
        },
        {
          isCorrect: false,
          label: "$$8$$ bulan",
        },
        {
          isCorrect: false,
          label: "$$9$$ bulan",
        },
      ],
    },
  },
};

export default item;
