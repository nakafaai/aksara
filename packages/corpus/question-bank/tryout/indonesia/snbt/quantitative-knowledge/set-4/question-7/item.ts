import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$1, 2, 3$$",
        },
        {
          isCorrect: false,
          label: "$$1 \\text{ und } 3$$",
        },
        {
          isCorrect: false,
          label: "$$2 \\text{ und } 4$$",
        },
        {
          isCorrect: false,
          label: "$$4 \\text{ nur}$$",
        },
        {
          isCorrect: false,
          label: "alle",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$1, 2, 3$$",
        },
        {
          isCorrect: false,
          label: "$$1 \\text{ and } 3$$",
        },
        {
          isCorrect: false,
          label: "$$2 \\text{ and } 4$$",
        },
        {
          isCorrect: false,
          label: "$$4 \\text{ only}$$",
        },
        {
          isCorrect: false,
          label: "all",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$1, 2, 3$$",
        },
        {
          isCorrect: false,
          label: "$$1 \\text{ dan } 3$$",
        },
        {
          isCorrect: false,
          label: "$$2 \\text{ dan } 4$$",
        },
        {
          isCorrect: false,
          label: "$$4 \\text{ saja}$$",
        },
        {
          isCorrect: false,
          label: "semua",
        },
      ],
    },
  },
};

export default item;
