import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$81 \\text{ und } 10$$",
        },
        {
          isCorrect: true,
          label: "$$65 \\text{ und } 9$$",
        },
        {
          isCorrect: false,
          label: "$$66 \\text{ und } 11$$",
        },
        {
          isCorrect: false,
          label: "$$68 \\text{ und } 12$$",
        },
        {
          isCorrect: false,
          label: "$$68 \\text{ und } 8$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$81 \\text{ and } 10$$",
        },
        {
          isCorrect: true,
          label: "$$65 \\text{ and } 9$$",
        },
        {
          isCorrect: false,
          label: "$$66 \\text{ and } 11$$",
        },
        {
          isCorrect: false,
          label: "$$68 \\text{ and } 12$$",
        },
        {
          isCorrect: false,
          label: "$$68 \\text{ and } 8$$",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$81 \\text{ dan } 10$$",
        },
        {
          isCorrect: true,
          label: "$$65 \\text{ dan } 9$$",
        },
        {
          isCorrect: false,
          label: "$$66 \\text{ dan } 11$$",
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
