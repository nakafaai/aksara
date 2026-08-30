import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$1 : 2$$",
        },
        {
          isCorrect: false,
          label: "$$3 : 4$$",
        },
        {
          isCorrect: false,
          label: "$$4 : 5$$",
        },
        {
          isCorrect: true,
          label: "$$2 : 1$$",
        },
        {
          isCorrect: false,
          label: "$$4 : 3$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$1 : 2$$",
        },
        {
          isCorrect: false,
          label: "$$3 : 4$$",
        },
        {
          isCorrect: false,
          label: "$$4 : 5$$",
        },
        {
          isCorrect: true,
          label: "$$2 : 1$$",
        },
        {
          isCorrect: false,
          label: "$$4 : 3$$",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$1 : 2$$",
        },
        {
          isCorrect: false,
          label: "$$3 : 4$$",
        },
        {
          isCorrect: false,
          label: "$$4 : 5$$",
        },
        {
          isCorrect: true,
          label: "$$2 : 1$$",
        },
        {
          isCorrect: false,
          label: "$$4 : 3$$",
        },
      ],
    },
  },
};

export default item;
