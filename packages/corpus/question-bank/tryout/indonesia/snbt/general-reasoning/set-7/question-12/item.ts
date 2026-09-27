import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$1{,}75\\text{ meter}$$",
        },
        {
          isCorrect: false,
          label: "$$1{,}85\\text{ meter}$$",
        },
        {
          isCorrect: false,
          label: "$$1{,}90\\text{ meter}$$",
        },
        {
          isCorrect: true,
          label: "$$2{,}00\\text{ meter}$$",
        },
        {
          isCorrect: false,
          label: "$$2{,}10\\text{ meter}$$",
        },
      ],
    },
  },
};

export default item;
