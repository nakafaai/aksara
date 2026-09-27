import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$45$$ dan $$186$$ orang",
        },
        {
          isCorrect: false,
          label: "$$45$$ dan $$187$$ orang",
        },
        {
          isCorrect: false,
          label: "$$45$$ dan $$188$$ orang",
        },
        {
          isCorrect: false,
          label: "$$46$$ dan $$189$$ orang",
        },
        {
          isCorrect: false,
          label: "$$46$$ dan $$190$$ orang",
        },
      ],
    },
  },
};

export default item;
