import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$14$$ tahun",
        },
        {
          isCorrect: false,
          label: "$$17$$ tahun",
        },
        {
          isCorrect: true,
          label: "$$18$$ tahun",
        },
        {
          isCorrect: false,
          label: "$$20$$ tahun",
        },
        {
          isCorrect: false,
          label: "$$22$$ tahun",
        },
      ],
    },
  },
};

export default item;
