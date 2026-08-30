import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$210$$",
        },
        {
          isCorrect: false,
          label: "$$105$$",
        },
        {
          isCorrect: false,
          label: "$$42$$",
        },
        {
          isCorrect: false,
          label: "$$35$$",
        },
        {
          isCorrect: false,
          label: "$$30$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: true, label: "$$210$$" },
        { isCorrect: false, label: "$$105$$" },
        { isCorrect: false, label: "$$42$$" },
        { isCorrect: false, label: "$$35$$" },
        { isCorrect: false, label: "$$30$$" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: true, label: "$$210$$" },
        { isCorrect: false, label: "$$105$$" },
        { isCorrect: false, label: "$$42$$" },
        { isCorrect: false, label: "$$35$$" },
        { isCorrect: false, label: "$$30$$" },
      ],
    },
  },
};

export default item;
