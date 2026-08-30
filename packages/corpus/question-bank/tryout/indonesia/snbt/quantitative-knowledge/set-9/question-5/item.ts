import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$\\frac{1}{12}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{1}{4}$$",
        },
        {
          isCorrect: true,
          label: "$$\\frac{5}{12}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{1}{2}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{2}{3}$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$\\frac{1}{12}$$" },
        { isCorrect: false, label: "$$\\frac{1}{4}$$" },
        { isCorrect: true, label: "$$\\frac{5}{12}$$" },
        { isCorrect: false, label: "$$\\frac{1}{2}$$" },
        { isCorrect: false, label: "$$\\frac{2}{3}$$" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$\\frac{1}{12}$$" },
        { isCorrect: false, label: "$$\\frac{1}{4}$$" },
        { isCorrect: true, label: "$$\\frac{5}{12}$$" },
        { isCorrect: false, label: "$$\\frac{1}{2}$$" },
        { isCorrect: false, label: "$$\\frac{2}{3}$$" },
      ],
    },
  },
};

export default item;
