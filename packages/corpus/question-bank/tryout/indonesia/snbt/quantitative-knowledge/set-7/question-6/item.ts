import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$4$$",
        },
        {
          isCorrect: false,
          label: "$$2$$",
        },
        {
          isCorrect: false,
          label: "$$0$$",
        },
        {
          isCorrect: false,
          label: "$$-2$$",
        },
        {
          isCorrect: true,
          label: "$$8$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$4$$" },
        { isCorrect: false, label: "$$2$$" },
        { isCorrect: false, label: "$$0$$" },
        { isCorrect: false, label: "$$-2$$" },
        { isCorrect: true, label: "$$8$$" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$4$$" },
        { isCorrect: false, label: "$$2$$" },
        { isCorrect: false, label: "$$0$$" },
        { isCorrect: false, label: "$$-2$$" },
        { isCorrect: true, label: "$$8$$" },
      ],
    },
  },
};

export default item;
