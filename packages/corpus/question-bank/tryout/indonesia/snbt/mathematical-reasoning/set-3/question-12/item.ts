import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$36$$ Orang",
        },
        {
          isCorrect: false,
          label: "$$60$$ Orang",
        },
        {
          isCorrect: false,
          label: "$$48$$ Orang",
        },
        {
          isCorrect: false,
          label: "$$30$$ Orang",
        },
        {
          isCorrect: false,
          label: "$$20$$ Orang",
        },
      ],
    },
  },
};

export default item;
