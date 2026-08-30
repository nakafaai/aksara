import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$16(\\sqrt{3}-1)$$",
        },
        {
          isCorrect: false,
          label: "$$16(\\sqrt{2}-1)$$",
        },
        {
          isCorrect: false,
          label: "$$16$$",
        },
        {
          isCorrect: false,
          label: "$$16\\sqrt{3}$$",
        },
        {
          isCorrect: false,
          label: "$$32\\sqrt{3}$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: true, label: "$$16(\\sqrt{3}-1)$$" },
        { isCorrect: false, label: "$$16(\\sqrt{2}-1)$$" },
        { isCorrect: false, label: "$$16$$" },
        { isCorrect: false, label: "$$16\\sqrt{3}$$" },
        { isCorrect: false, label: "$$32\\sqrt{3}$$" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: true, label: "$$16(\\sqrt{3}-1)$$" },
        { isCorrect: false, label: "$$16(\\sqrt{2}-1)$$" },
        { isCorrect: false, label: "$$16$$" },
        { isCorrect: false, label: "$$16\\sqrt{3}$$" },
        { isCorrect: false, label: "$$32\\sqrt{3}$$" },
      ],
    },
  },
};

export default item;
