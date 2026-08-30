import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$96$$",
        },
        {
          isCorrect: true,
          label: "$$72$$",
        },
        {
          isCorrect: false,
          label: "$$54$$",
        },
        {
          isCorrect: false,
          label: "$$48$$",
        },
        {
          isCorrect: false,
          label: "$$32$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$96$$" },
        { isCorrect: true, label: "$$72$$" },
        { isCorrect: false, label: "$$54$$" },
        { isCorrect: false, label: "$$48$$" },
        { isCorrect: false, label: "$$32$$" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$96$$" },
        { isCorrect: true, label: "$$72$$" },
        { isCorrect: false, label: "$$54$$" },
        { isCorrect: false, label: "$$48$$" },
        { isCorrect: false, label: "$$32$$" },
      ],
    },
  },
};

export default item;
