import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$5 \\text{ und } -3$$",
        },
        {
          isCorrect: false,
          label: "$$-5 \\text{ und } 3$$",
        },
        {
          isCorrect: true,
          label: "$$\\frac{5}{3} \\text{ und } -1$$",
        },
        {
          isCorrect: false,
          label: "$$-\\frac{5}{3} \\text{ und } 1$$",
        },
        {
          isCorrect: false,
          label: "$$5 \\text{ und } -1$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$5 \\text{ and } -3$$" },
        { isCorrect: false, label: "$$-5 \\text{ and } 3$$" },
        { isCorrect: true, label: "$$\\frac{5}{3} \\text{ and } -1$$" },
        { isCorrect: false, label: "$$-\\frac{5}{3} \\text{ and } 1$$" },
        { isCorrect: false, label: "$$5 \\text{ and } -1$$" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$5 \\text{ dan } -3$$" },
        { isCorrect: false, label: "$$-5 \\text{ dan } 3$$" },
        { isCorrect: true, label: "$$\\frac{5}{3} \\text{ dan } -1$$" },
        { isCorrect: false, label: "$$-\\frac{5}{3} \\text{ dan } 1$$" },
        { isCorrect: false, label: "$$5 \\text{ dan } -1$$" },
      ],
    },
  },
};

export default item;
