import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$15$$",
        },
        {
          isCorrect: true,
          label: "$$16$$",
        },
        {
          isCorrect: false,
          label: "$$17$$",
        },
        {
          isCorrect: false,
          label: "$$18$$",
        },
        {
          isCorrect: false,
          label: "$$19$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$15$$" },
        { isCorrect: true, label: "$$16$$" },
        { isCorrect: false, label: "$$17$$" },
        { isCorrect: false, label: "$$18$$" },
        { isCorrect: false, label: "$$19$$" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$15$$" },
        { isCorrect: true, label: "$$16$$" },
        { isCorrect: false, label: "$$17$$" },
        { isCorrect: false, label: "$$18$$" },
        { isCorrect: false, label: "$$19$$" },
      ],
    },
  },
};

export default item;
