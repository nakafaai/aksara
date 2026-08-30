import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$300$$",
        },
        {
          isCorrect: false,
          label: "$$150$$",
        },
        {
          isCorrect: true,
          label: "$$100$$",
        },
        {
          isCorrect: false,
          label: "$$75$$",
        },
        {
          isCorrect: false,
          label: "$$50$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$300$$" },
        { isCorrect: false, label: "$$150$$" },
        { isCorrect: true, label: "$$100$$" },
        { isCorrect: false, label: "$$75$$" },
        { isCorrect: false, label: "$$50$$" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$300$$" },
        { isCorrect: false, label: "$$150$$" },
        { isCorrect: true, label: "$$100$$" },
        { isCorrect: false, label: "$$75$$" },
        { isCorrect: false, label: "$$50$$" },
      ],
    },
  },
};

export default item;
