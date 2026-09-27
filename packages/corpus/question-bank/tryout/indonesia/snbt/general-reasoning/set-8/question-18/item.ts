import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$\\text{D}$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{A}$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{B}$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{C}$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{E}$$",
        },
      ],
    },
  },
};

export default item;
