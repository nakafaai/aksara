import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$\\frac{1}{11}$$",
        },
        {
          isCorrect: true,
          label: "$$\\frac{2}{11}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{4}{11}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{3}{5}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{5}{7}$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$\\frac{1}{11}$$" },
        { isCorrect: true, label: "$$\\frac{2}{11}$$" },
        { isCorrect: false, label: "$$\\frac{4}{11}$$" },
        { isCorrect: false, label: "$$\\frac{3}{5}$$" },
        { isCorrect: false, label: "$$\\frac{5}{7}$$" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$\\frac{1}{11}$$" },
        { isCorrect: true, label: "$$\\frac{2}{11}$$" },
        { isCorrect: false, label: "$$\\frac{4}{11}$$" },
        { isCorrect: false, label: "$$\\frac{3}{5}$$" },
        { isCorrect: false, label: "$$\\frac{5}{7}$$" },
      ],
    },
  },
};

export default item;
