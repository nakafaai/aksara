import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$y = -x + 1$$",
        },
        {
          isCorrect: true,
          label: "$$y = x + 1$$",
        },
        {
          isCorrect: false,
          label: "$$y = 2x - 1$$",
        },
        {
          isCorrect: false,
          label: "$$y = 2x + 1$$",
        },
        {
          isCorrect: false,
          label: "$$y = 2x + 2$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$y = -x + 1$$",
        },
        {
          isCorrect: true,
          label: "$$y = x + 1$$",
        },
        {
          isCorrect: false,
          label: "$$y = 2x - 1$$",
        },
        {
          isCorrect: false,
          label: "$$y = 2x + 1$$",
        },
        {
          isCorrect: false,
          label: "$$y = 2x + 2$$",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$y = -x + 1$$",
        },
        {
          isCorrect: true,
          label: "$$y = x + 1$$",
        },
        {
          isCorrect: false,
          label: "$$y = 2x - 1$$",
        },
        {
          isCorrect: false,
          label: "$$y = 2x + 1$$",
        },
        {
          isCorrect: false,
          label: "$$y = 2x + 2$$",
        },
      ],
    },
  },
};

export default item;
