import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$48$$",
        },
        {
          isCorrect: false,
          label: "$$56$$",
        },
        {
          isCorrect: false,
          label: "$$63$$",
        },
        {
          isCorrect: false,
          label: "$$72$$",
        },
        {
          isCorrect: false,
          label: "$$80$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: true, label: "$$48$$" },
        { isCorrect: false, label: "$$56$$" },
        { isCorrect: false, label: "$$63$$" },
        { isCorrect: false, label: "$$72$$" },
        { isCorrect: false, label: "$$80$$" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: true, label: "$$48$$" },
        { isCorrect: false, label: "$$56$$" },
        { isCorrect: false, label: "$$63$$" },
        { isCorrect: false, label: "$$72$$" },
        { isCorrect: false, label: "$$80$$" },
      ],
    },
  },
};

export default item;
