import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$3$$" },
        { isCorrect: true, label: "$$7$$" },
        { isCorrect: false, label: "$$5$$" },
        { isCorrect: false, label: "$$10$$" },
        { isCorrect: false, label: "$$13$$" },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$3$$" },
        { isCorrect: true, label: "$$7$$" },
        { isCorrect: false, label: "$$5$$" },
        { isCorrect: false, label: "$$10$$" },
        { isCorrect: false, label: "$$13$$" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$3$$" },
        { isCorrect: true, label: "$$7$$" },
        { isCorrect: false, label: "$$5$$" },
        { isCorrect: false, label: "$$10$$" },
        { isCorrect: false, label: "$$13$$" },
      ],
    },
  },
};

export default item;
