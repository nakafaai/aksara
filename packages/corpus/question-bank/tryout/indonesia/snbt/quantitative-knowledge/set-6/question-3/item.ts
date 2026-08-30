import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$\\frac{1}{2}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{1}{7}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{1}{4}$$",
        },
        {
          isCorrect: true,
          label: "$$\\frac{3}{7}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{8}{9}$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$\\frac{1}{2}$$" },
        { isCorrect: false, label: "$$\\frac{1}{7}$$" },
        { isCorrect: false, label: "$$\\frac{1}{4}$$" },
        { isCorrect: true, label: "$$\\frac{3}{7}$$" },
        { isCorrect: false, label: "$$\\frac{8}{9}$$" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$\\frac{1}{2}$$" },
        { isCorrect: false, label: "$$\\frac{1}{7}$$" },
        { isCorrect: false, label: "$$\\frac{1}{4}$$" },
        { isCorrect: true, label: "$$\\frac{3}{7}$$" },
        { isCorrect: false, label: "$$\\frac{8}{9}$$" },
      ],
    },
  },
};

export default item;
