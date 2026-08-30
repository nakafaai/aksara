import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$14 \\text{ und } 2$$",
        },
        {
          isCorrect: false,
          label: "$$12 \\text{ und } 2$$",
        },
        {
          isCorrect: false,
          label: "$$8 \\text{ und } 2$$",
        },
        {
          isCorrect: true,
          label: "$$4 \\text{ und } 2$$",
        },
        {
          isCorrect: false,
          label: "$$2 \\text{ und } 2$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$14 \\text{ and } 2$$",
        },
        {
          isCorrect: false,
          label: "$$12 \\text{ and } 2$$",
        },
        {
          isCorrect: false,
          label: "$$8 \\text{ and } 2$$",
        },
        {
          isCorrect: true,
          label: "$$4 \\text{ and } 2$$",
        },
        {
          isCorrect: false,
          label: "$$2 \\text{ and } 2$$",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$14 \\text{ dan } 2$$",
        },
        {
          isCorrect: false,
          label: "$$12 \\text{ dan } 2$$",
        },
        {
          isCorrect: false,
          label: "$$8 \\text{ dan } 2$$",
        },
        {
          isCorrect: true,
          label: "$$4 \\text{ dan } 2$$",
        },
        {
          isCorrect: false,
          label: "$$2 \\text{ dan } 2$$",
        },
      ],
    },
  },
};

export default item;
