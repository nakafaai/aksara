import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$20\\%$$",
        },
        {
          isCorrect: false,
          label: "$$25\\%$$",
        },
        {
          isCorrect: false,
          label: "$$30\\%$$",
        },
        {
          isCorrect: false,
          label: "$$40\\%$$",
        },
        {
          isCorrect: true,
          label: "$$33\\frac13\\%$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$20\\%$$",
        },
        {
          isCorrect: false,
          label: "$$25\\%$$",
        },
        {
          isCorrect: false,
          label: "$$30\\%$$",
        },
        {
          isCorrect: false,
          label: "$$40\\%$$",
        },
        {
          isCorrect: true,
          label: "$$33\\frac13\\%$$",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$20\\%$$",
        },
        {
          isCorrect: false,
          label: "$$25\\%$$",
        },
        {
          isCorrect: false,
          label: "$$30\\%$$",
        },
        {
          isCorrect: false,
          label: "$$40\\%$$",
        },
        {
          isCorrect: true,
          label: "$$33\\frac13\\%$$",
        },
      ],
    },
  },
};

export default item;
