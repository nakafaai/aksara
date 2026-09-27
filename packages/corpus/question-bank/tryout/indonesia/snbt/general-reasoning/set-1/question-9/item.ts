import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$3\\text{ jam}$$",
        },
        {
          isCorrect: false,
          label: "$$1\\text{ jam}$$",
        },
        {
          isCorrect: false,
          label: "$$1\\text{ jam} 30\\text{ menit}$$",
        },
        {
          isCorrect: false,
          label: "$$2\\text{ jam}$$",
        },
        {
          isCorrect: false,
          label: "$$2\\text{ jam} 30\\text{ menit}$$",
        },
      ],
    },
  },
};

export default item;
