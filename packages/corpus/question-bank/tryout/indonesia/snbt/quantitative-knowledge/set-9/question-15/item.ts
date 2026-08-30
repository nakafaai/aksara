import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$x > y$$",
        },
        {
          isCorrect: true,
          label: "$$x < y$$",
        },
        {
          isCorrect: false,
          label: "$$x = y$$",
        },
        {
          isCorrect: false,
          label: "$$2x = y$$",
        },
        {
          isCorrect: false,
          label: "$$x = 4y$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$x > y$$",
        },
        {
          isCorrect: true,
          label: "$$x < y$$",
        },
        {
          isCorrect: false,
          label: "$$x = y$$",
        },
        {
          isCorrect: false,
          label: "$$2x = y$$",
        },
        {
          isCorrect: false,
          label: "$$x = 4y$$",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$x > y$$",
        },
        {
          isCorrect: true,
          label: "$$x < y$$",
        },
        {
          isCorrect: false,
          label: "$$x = y$$",
        },
        {
          isCorrect: false,
          label: "$$2x = y$$",
        },
        {
          isCorrect: false,
          label: "$$x = 4y$$",
        },
      ],
    },
  },
};

export default item;
