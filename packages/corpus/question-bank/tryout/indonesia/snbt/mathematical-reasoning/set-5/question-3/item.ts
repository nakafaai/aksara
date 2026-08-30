import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$188$$",
        },
        {
          isCorrect: false,
          label: "$$220$$",
        },
        {
          isCorrect: true,
          label: "$$246$$",
        },
        {
          isCorrect: false,
          label: "$$300$$",
        },
        {
          isCorrect: false,
          label: "$$306$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$188$$" },
        { isCorrect: false, label: "$$220$$" },
        { isCorrect: true, label: "$$246$$" },
        { isCorrect: false, label: "$$300$$" },
        { isCorrect: false, label: "$$306$$" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$188$$" },
        { isCorrect: false, label: "$$220$$" },
        { isCorrect: true, label: "$$246$$" },
        { isCorrect: false, label: "$$300$$" },
        { isCorrect: false, label: "$$306$$" },
      ],
    },
  },
};

export default item;
