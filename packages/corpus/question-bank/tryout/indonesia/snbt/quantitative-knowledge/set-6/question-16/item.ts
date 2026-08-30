import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$30$$",
        },
        {
          isCorrect: false,
          label: "$$25$$",
        },
        {
          isCorrect: false,
          label: "$$20$$",
        },
        {
          isCorrect: false,
          label: "$$15$$",
        },
        {
          isCorrect: true,
          label: "$$10$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$30$$" },
        { isCorrect: false, label: "$$25$$" },
        { isCorrect: false, label: "$$20$$" },
        { isCorrect: false, label: "$$15$$" },
        { isCorrect: true, label: "$$10$$" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$30$$" },
        { isCorrect: false, label: "$$25$$" },
        { isCorrect: false, label: "$$20$$" },
        { isCorrect: false, label: "$$15$$" },
        { isCorrect: true, label: "$$10$$" },
      ],
    },
  },
};

export default item;
