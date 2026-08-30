import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$14$$",
        },
        {
          isCorrect: false,
          label: "$$18$$",
        },
        {
          isCorrect: false,
          label: "$$13$$",
        },
        {
          isCorrect: false,
          label: "$$9$$",
        },
        {
          isCorrect: false,
          label: "$$7$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: true, label: "$$14$$" },
        { isCorrect: false, label: "$$18$$" },
        { isCorrect: false, label: "$$13$$" },
        { isCorrect: false, label: "$$9$$" },
        { isCorrect: false, label: "$$7$$" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: true, label: "$$14$$" },
        { isCorrect: false, label: "$$18$$" },
        { isCorrect: false, label: "$$13$$" },
        { isCorrect: false, label: "$$9$$" },
        { isCorrect: false, label: "$$7$$" },
      ],
    },
  },
};

export default item;
