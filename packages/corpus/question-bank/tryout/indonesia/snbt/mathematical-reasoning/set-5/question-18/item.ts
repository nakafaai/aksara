import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$2:3$$",
        },
        {
          isCorrect: true,
          label: "$$3:4$$",
        },
        {
          isCorrect: false,
          label: "$$4:5$$",
        },
        {
          isCorrect: false,
          label: "$$2:5$$",
        },
        {
          isCorrect: false,
          label: "$$1:2$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$2:3$$",
        },
        {
          isCorrect: true,
          label: "$$3:4$$",
        },
        {
          isCorrect: false,
          label: "$$4:5$$",
        },
        {
          isCorrect: false,
          label: "$$2:5$$",
        },
        {
          isCorrect: false,
          label: "$$1:2$$",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$2:3$$",
        },
        {
          isCorrect: true,
          label: "$$3:4$$",
        },
        {
          isCorrect: false,
          label: "$$4:5$$",
        },
        {
          isCorrect: false,
          label: "$$2:5$$",
        },
        {
          isCorrect: false,
          label: "$$1:2$$",
        },
      ],
    },
  },
};

export default item;
