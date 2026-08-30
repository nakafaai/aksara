import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$15$$",
        },
        {
          isCorrect: false,
          label: "$$25$$",
        },
        {
          isCorrect: false,
          label: "$$30$$",
        },
        {
          isCorrect: false,
          label: "$$40$$",
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
        { isCorrect: true, label: "$$15$$" },
        { isCorrect: false, label: "$$25$$" },
        { isCorrect: false, label: "$$30$$" },
        { isCorrect: false, label: "$$40$$" },
        { isCorrect: false, label: "$$60$$" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: true, label: "$$15$$" },
        { isCorrect: false, label: "$$25$$" },
        { isCorrect: false, label: "$$30$$" },
        { isCorrect: false, label: "$$40$$" },
        { isCorrect: false, label: "$$60$$" },
      ],
    },
  },
};

export default item;
