import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$96$$",
        },
        {
          isCorrect: true,
          label: "$$208$$",
        },
        {
          isCorrect: false,
          label: "$$110$$",
        },
        {
          isCorrect: false,
          label: "$$128$$",
        },
        {
          isCorrect: false,
          label: "$$156$$",
        },
      ],
    },
  },
};

export default item;
