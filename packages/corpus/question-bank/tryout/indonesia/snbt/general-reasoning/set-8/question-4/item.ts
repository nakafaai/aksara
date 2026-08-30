import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$23$$",
        },
        {
          isCorrect: false,
          label: "$$24$$",
        },
        {
          isCorrect: false,
          label: "$$25$$",
        },
        {
          isCorrect: false,
          label: "$$26$$",
        },
        {
          isCorrect: false,
          label: "$$27$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: true, label: "$$23$$" },
        { isCorrect: false, label: "$$24$$" },
        { isCorrect: false, label: "$$25$$" },
        { isCorrect: false, label: "$$26$$" },
        { isCorrect: false, label: "$$27$$" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: true, label: "$$23$$" },
        { isCorrect: false, label: "$$24$$" },
        { isCorrect: false, label: "$$25$$" },
        { isCorrect: false, label: "$$26$$" },
        { isCorrect: false, label: "$$27$$" },
      ],
    },
  },
};

export default item;
