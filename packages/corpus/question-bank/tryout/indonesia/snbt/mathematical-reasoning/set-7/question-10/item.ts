import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$\\frac{1}{20}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{1}{10}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{1}{8}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{1}{4}$$",
        },
        {
          isCorrect: true,
          label: "$$\\frac{3}{4}$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$\\frac{1}{20}$$" },
        { isCorrect: false, label: "$$\\frac{1}{10}$$" },
        { isCorrect: false, label: "$$\\frac{1}{8}$$" },
        { isCorrect: false, label: "$$\\frac{1}{4}$$" },
        { isCorrect: true, label: "$$\\frac{3}{4}$$" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$\\frac{1}{20}$$" },
        { isCorrect: false, label: "$$\\frac{1}{10}$$" },
        { isCorrect: false, label: "$$\\frac{1}{8}$$" },
        { isCorrect: false, label: "$$\\frac{1}{4}$$" },
        { isCorrect: true, label: "$$\\frac{3}{4}$$" },
      ],
    },
  },
};

export default item;
