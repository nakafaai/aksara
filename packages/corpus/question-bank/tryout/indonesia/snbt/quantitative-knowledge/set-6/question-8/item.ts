import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$46$$",
        },
        {
          isCorrect: true,
          label: "$$48$$",
        },
        {
          isCorrect: false,
          label: "$$54$$",
        },
        {
          isCorrect: false,
          label: "$$56$$",
        },
        {
          isCorrect: false,
          label: "$$58$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$46$$" },
        { isCorrect: true, label: "$$48$$" },
        { isCorrect: false, label: "$$54$$" },
        { isCorrect: false, label: "$$56$$" },
        { isCorrect: false, label: "$$58$$" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$46$$" },
        { isCorrect: true, label: "$$48$$" },
        { isCorrect: false, label: "$$54$$" },
        { isCorrect: false, label: "$$56$$" },
        { isCorrect: false, label: "$$58$$" },
      ],
    },
  },
};

export default item;
