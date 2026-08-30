import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$2 : 3$$",
        },
        {
          isCorrect: false,
          label: "$$3 : 4$$",
        },
        {
          isCorrect: false,
          label: "$$2 : 5$$",
        },
        {
          isCorrect: false,
          label: "$$3 : 5$$",
        },
        {
          isCorrect: false,
          label: "$$4 : 5$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: true, label: "$$2 : 3$$" },
        { isCorrect: false, label: "$$3 : 4$$" },
        { isCorrect: false, label: "$$2 : 5$$" },
        { isCorrect: false, label: "$$3 : 5$$" },
        { isCorrect: false, label: "$$4 : 5$$" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: true, label: "$$2 : 3$$" },
        { isCorrect: false, label: "$$3 : 4$$" },
        { isCorrect: false, label: "$$2 : 5$$" },
        { isCorrect: false, label: "$$3 : 5$$" },
        { isCorrect: false, label: "$$4 : 5$$" },
      ],
    },
  },
};

export default item;
