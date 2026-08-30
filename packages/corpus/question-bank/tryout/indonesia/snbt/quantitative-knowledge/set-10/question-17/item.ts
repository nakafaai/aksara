import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$\\frac{1}{3}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{2}{3}$$",
        },
        {
          isCorrect: false,
          label: "$$0{,}333$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{1}{4}$$",
        },
        {
          isCorrect: true,
          label: "$$0{,}5$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$\\frac{1}{3}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{2}{3}$$",
        },
        {
          isCorrect: false,
          label: "$$0.333$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{1}{4}$$",
        },
        {
          isCorrect: true,
          label: "$$0.5$$",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$\\frac{1}{3}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{2}{3}$$",
        },
        {
          isCorrect: false,
          label: "$$0{,}333$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{1}{4}$$",
        },
        {
          isCorrect: true,
          label: "$$0{,}5$$",
        },
      ],
    },
  },
};

export default item;
