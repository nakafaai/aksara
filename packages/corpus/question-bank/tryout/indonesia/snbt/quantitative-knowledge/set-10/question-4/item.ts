import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$-14$$",
        },
        {
          isCorrect: false,
          label: "$$-15$$",
        },
        {
          isCorrect: false,
          label: "$$-18$$",
        },
        {
          isCorrect: true,
          label: "$$14$$",
        },
        {
          isCorrect: false,
          label: "$$18$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$-14$$" },
        { isCorrect: false, label: "$$-15$$" },
        { isCorrect: false, label: "$$-18$$" },
        { isCorrect: true, label: "$$14$$" },
        { isCorrect: false, label: "$$18$$" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$-14$$" },
        { isCorrect: false, label: "$$-15$$" },
        { isCorrect: false, label: "$$-18$$" },
        { isCorrect: true, label: "$$14$$" },
        { isCorrect: false, label: "$$18$$" },
      ],
    },
  },
};

export default item;
