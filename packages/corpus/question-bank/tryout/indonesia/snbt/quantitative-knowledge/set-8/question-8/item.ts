import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$2$$ tahun",
        },
        {
          isCorrect: false,
          label: "$$3$$ tahun",
        },
        {
          isCorrect: false,
          label: "$$4$$ tahun",
        },
        {
          isCorrect: true,
          label: "$$6$$ tahun",
        },
        {
          isCorrect: false,
          label: "$$5$$ tahun",
        },
      ],
    },
  },
};

export default item;
