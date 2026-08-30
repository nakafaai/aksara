import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$40$$",
        },
        {
          isCorrect: false,
          label: "$$42$$",
        },
        {
          isCorrect: false,
          label: "$$45$$",
        },
        {
          isCorrect: false,
          label: "$$50$$",
        },
        {
          isCorrect: false,
          label: "$$60$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: true, label: "$$40$$" },
        { isCorrect: false, label: "$$42$$" },
        { isCorrect: false, label: "$$45$$" },
        { isCorrect: false, label: "$$50$$" },
        { isCorrect: false, label: "$$60$$" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: true, label: "$$40$$" },
        { isCorrect: false, label: "$$42$$" },
        { isCorrect: false, label: "$$45$$" },
        { isCorrect: false, label: "$$50$$" },
        { isCorrect: false, label: "$$60$$" },
      ],
    },
  },
};

export default item;
