import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$3$$",
        },
        {
          isCorrect: false,
          label: "$$4$$",
        },
        {
          isCorrect: true,
          label: "$$5$$",
        },
        {
          isCorrect: false,
          label: "$$16$$",
        },
        {
          isCorrect: false,
          label: "$$25$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$3$$" },
        { isCorrect: false, label: "$$4$$" },
        { isCorrect: true, label: "$$5$$" },
        { isCorrect: false, label: "$$16$$" },
        { isCorrect: false, label: "$$25$$" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$3$$" },
        { isCorrect: false, label: "$$4$$" },
        { isCorrect: true, label: "$$5$$" },
        { isCorrect: false, label: "$$16$$" },
        { isCorrect: false, label: "$$25$$" },
      ],
    },
  },
};

export default item;
