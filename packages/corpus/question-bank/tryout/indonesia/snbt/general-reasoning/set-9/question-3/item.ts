import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$37$$",
        },
        {
          isCorrect: false,
          label: "$$38$$",
        },
        {
          isCorrect: false,
          label: "$$39$$",
        },
        {
          isCorrect: false,
          label: "$$40$$",
        },
        {
          isCorrect: false,
          label: "$$41$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: true, label: "$$37$$" },
        { isCorrect: false, label: "$$38$$" },
        { isCorrect: false, label: "$$39$$" },
        { isCorrect: false, label: "$$40$$" },
        { isCorrect: false, label: "$$41$$" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: true, label: "$$37$$" },
        { isCorrect: false, label: "$$38$$" },
        { isCorrect: false, label: "$$39$$" },
        { isCorrect: false, label: "$$40$$" },
        { isCorrect: false, label: "$$41$$" },
      ],
    },
  },
};

export default item;
