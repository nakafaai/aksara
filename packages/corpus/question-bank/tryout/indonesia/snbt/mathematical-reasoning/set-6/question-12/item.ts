import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$1\\text{ jam }20\\text{ menit}$$",
        },
        {
          isCorrect: true,
          label: "$$1\\text{ jam }15\\text{ menit}$$",
        },
        {
          isCorrect: false,
          label: "$$1\\text{ jam }25\\text{ menit}$$",
        },
        {
          isCorrect: false,
          label: "$$2\\text{ jam }15\\text{ menit}$$",
        },
        {
          isCorrect: false,
          label: "$$2\\text{ jam }20\\text{ menit}$$",
        },
      ],
    },
  },
};

export default item;
