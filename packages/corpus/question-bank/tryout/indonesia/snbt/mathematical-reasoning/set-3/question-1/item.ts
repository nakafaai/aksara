import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$120$$",
        },
        {
          isCorrect: false,
          label: "$$150$$",
        },
        {
          isCorrect: false,
          label: "$$180$$",
        },
        {
          isCorrect: true,
          label: "$$220$$",
        },
        {
          isCorrect: false,
          label: "$$245$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$120$$" },
        { isCorrect: false, label: "$$150$$" },
        { isCorrect: false, label: "$$180$$" },
        { isCorrect: true, label: "$$220$$" },
        { isCorrect: false, label: "$$245$$" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$120$$" },
        { isCorrect: false, label: "$$150$$" },
        { isCorrect: false, label: "$$180$$" },
        { isCorrect: true, label: "$$220$$" },
        { isCorrect: false, label: "$$245$$" },
      ],
    },
  },
};

export default item;
