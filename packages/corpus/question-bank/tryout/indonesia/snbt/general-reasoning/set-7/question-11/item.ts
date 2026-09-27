import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$150\\text{ gram}$$",
        },
        {
          isCorrect: false,
          label: "$$175\\text{ gram}$$",
        },
        {
          isCorrect: false,
          label: "$$250\\text{ gram}$$",
        },
        {
          isCorrect: false,
          label: "$$275\\text{ gram}$$",
        },
        {
          isCorrect: true,
          label: "$$225\\text{ gram}$$",
        },
      ],
    },
  },
};

export default item;
