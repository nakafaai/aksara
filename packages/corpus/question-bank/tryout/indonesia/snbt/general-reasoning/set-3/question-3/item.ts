import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$-3$$",
        },
        {
          isCorrect: false,
          label: "$$-1$$",
        },
        {
          isCorrect: false,
          label: "$$0$$",
        },
        {
          isCorrect: false,
          label: "$$1$$",
        },
        {
          isCorrect: false,
          label: "$$3$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: true, label: "$$-3$$" },
        { isCorrect: false, label: "$$-1$$" },
        { isCorrect: false, label: "$$0$$" },
        { isCorrect: false, label: "$$1$$" },
        { isCorrect: false, label: "$$3$$" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: true, label: "$$-3$$" },
        { isCorrect: false, label: "$$-1$$" },
        { isCorrect: false, label: "$$0$$" },
        { isCorrect: false, label: "$$1$$" },
        { isCorrect: false, label: "$$3$$" },
      ],
    },
  },
};

export default item;
