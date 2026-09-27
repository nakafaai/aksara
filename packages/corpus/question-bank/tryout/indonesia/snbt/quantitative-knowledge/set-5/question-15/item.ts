import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$-4 \\text{ atau } 2$$",
        },
        {
          isCorrect: true,
          label: "$$4 \\text{ atau } -2$$",
        },
        {
          isCorrect: false,
          label: "$$-2 \\text{ atau } 3$$",
        },
        {
          isCorrect: false,
          label: "$$2 \\text{ atau } -3$$",
        },
        {
          isCorrect: false,
          label: "$$3 \\text{ atau } 8$$",
        },
      ],
    },
  },
};

export default item;
