import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$1:1$$",
        },
        {
          isCorrect: false,
          label: "$$2:1$$",
        },
        {
          isCorrect: true,
          label: "$$3:2$$",
        },
        {
          isCorrect: false,
          label: "$$5:3$$",
        },
        {
          isCorrect: false,
          label: "$$2:3$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$1:1$$",
        },
        {
          isCorrect: false,
          label: "$$2:1$$",
        },
        {
          isCorrect: true,
          label: "$$3:2$$",
        },
        {
          isCorrect: false,
          label: "$$5:3$$",
        },
        {
          isCorrect: false,
          label: "$$2:3$$",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$1:1$$",
        },
        {
          isCorrect: false,
          label: "$$2:1$$",
        },
        {
          isCorrect: true,
          label: "$$3:2$$",
        },
        {
          isCorrect: false,
          label: "$$5:3$$",
        },
        {
          isCorrect: false,
          label: "$$2:3$$",
        },
      ],
    },
  },
};

export default item;
