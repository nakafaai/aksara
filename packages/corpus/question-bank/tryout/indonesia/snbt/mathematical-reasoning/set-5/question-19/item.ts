import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$9$$",
        },
        {
          isCorrect: false,
          label: "$$8$$",
        },
        {
          isCorrect: true,
          label: "$$5$$",
        },
        {
          isCorrect: false,
          label: "$$4$$",
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
        { isCorrect: false, label: "$$9$$" },
        { isCorrect: false, label: "$$8$$" },
        { isCorrect: true, label: "$$5$$" },
        { isCorrect: false, label: "$$4$$" },
        { isCorrect: false, label: "$$3$$" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$9$$" },
        { isCorrect: false, label: "$$8$$" },
        { isCorrect: true, label: "$$5$$" },
        { isCorrect: false, label: "$$4$$" },
        { isCorrect: false, label: "$$3$$" },
      ],
    },
  },
};

export default item;
