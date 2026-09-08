import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$\\frac{4}{3}C + 4{.}000$$",
        },
        {
          isCorrect: false,
          label: "$$C + 4{.}000$$",
        },
        {
          isCorrect: false,
          label: "$$2C + 4{.}000$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{3}{2}C + 1{.}000$$",
        },
        {
          isCorrect: false,
          label: "$$2C + 2{.}000$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$\\frac{4}{3}C + 4{,}000$$",
        },
        {
          isCorrect: false,
          label: "$$C + 4{,}000$$",
        },
        {
          isCorrect: false,
          label: "$$2C + 4{,}000$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{3}{2}C + 1{,}000$$",
        },
        {
          isCorrect: false,
          label: "$$2C + 2{,}000$$",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$\\frac{4}{3}C + 4{.}000$$",
        },
        {
          isCorrect: false,
          label: "$$C + 4{.}000$$",
        },
        {
          isCorrect: false,
          label: "$$2C + 4{.}000$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{3}{2}C + 1{.}000$$",
        },
        {
          isCorrect: false,
          label: "$$2C + 2{.}000$$",
        },
      ],
    },
  },
};

export default item;
