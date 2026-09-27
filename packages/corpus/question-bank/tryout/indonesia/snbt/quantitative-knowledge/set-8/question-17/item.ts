import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$1{,}181$$",
        },
        {
          isCorrect: false,
          label: "$$1{,}030$$",
        },
        {
          isCorrect: false,
          label: "$$1{,}124$$",
        },
        {
          isCorrect: true,
          label: "$$1{,}040$$",
        },
        {
          isCorrect: false,
          label: "$$1{,}110$$",
        },
      ],
    },
  },
};

export default item;
