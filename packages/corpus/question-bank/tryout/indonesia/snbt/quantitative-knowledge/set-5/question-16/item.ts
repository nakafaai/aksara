import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$81 \\text{ dan } 10$$",
        },
        {
          isCorrect: false,
          label: "$$66 \\text{ dan } 11$$",
        },
        {
          isCorrect: true,
          label: "$$65 \\text{ dan } 9$$",
        },
        {
          isCorrect: false,
          label: "$$68 \\text{ dan } 12$$",
        },
        {
          isCorrect: false,
          label: "$$68 \\text{ dan } 8$$",
        },
      ],
    },
  },
};

export default item;
