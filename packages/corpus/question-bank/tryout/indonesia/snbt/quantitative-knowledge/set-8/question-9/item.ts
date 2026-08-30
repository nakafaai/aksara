import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$m > 6$$",
        },
        {
          isCorrect: false,
          label: "$$-2 < m < 6$$",
        },
        {
          isCorrect: false,
          label: "$$-6 < m < 2$$",
        },
        {
          isCorrect: false,
          label: "$$m \\leq -2 \\lor m \\geq 6$$",
        },
        {
          isCorrect: true,
          label: "$$m < -2 \\lor m > 6$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$m > 6$$" },
        { isCorrect: false, label: "$$-2 < m < 6$$" },
        { isCorrect: false, label: "$$-6 < m < 2$$" },
        { isCorrect: false, label: "$$m \\leq -2 \\lor m \\geq 6$$" },
        { isCorrect: true, label: "$$m < -2 \\lor m > 6$$" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$m > 6$$" },
        { isCorrect: false, label: "$$-2 < m < 6$$" },
        { isCorrect: false, label: "$$-6 < m < 2$$" },
        { isCorrect: false, label: "$$m \\leq -2 \\lor m \\geq 6$$" },
        { isCorrect: true, label: "$$m < -2 \\lor m > 6$$" },
      ],
    },
  },
};

export default item;
