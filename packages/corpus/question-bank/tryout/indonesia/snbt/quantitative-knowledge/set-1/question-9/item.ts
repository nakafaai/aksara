import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$\\text{I dan II}$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{I, II, dan III}$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{II dan III}$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{I}$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{III}$$",
        },
      ],
    },
  },
};

export default item;
