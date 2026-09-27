import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$y = x^2 + 150x + 60{.}000$$",
        },
        {
          isCorrect: false,
          label: "$$y = -x^2 + 150x + 60{.}000$$",
        },
        {
          isCorrect: false,
          label: "$$y = -x^2 - 150x + 60{.}000$$",
        },
        {
          isCorrect: false,
          label: "$$y = x^2 - 150x + 60{.}000$$",
        },
        {
          isCorrect: false,
          label: "$$y = x^2 + 200x + 60{.}000$$",
        },
      ],
    },
  },
};

export default item;
