import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$4$$",
        },
        {
          isCorrect: false,
          label: "$$8$$",
        },
        {
          isCorrect: false,
          label: "$$10$$",
        },
        {
          isCorrect: false,
          label: "$$14$$",
        },
        {
          isCorrect: false,
          label: "$$16$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: true, label: "$$4$$" },
        { isCorrect: false, label: "$$8$$" },
        { isCorrect: false, label: "$$10$$" },
        { isCorrect: false, label: "$$14$$" },
        { isCorrect: false, label: "$$16$$" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: true, label: "$$4$$" },
        { isCorrect: false, label: "$$8$$" },
        { isCorrect: false, label: "$$10$$" },
        { isCorrect: false, label: "$$14$$" },
        { isCorrect: false, label: "$$16$$" },
      ],
    },
  },
};

export default item;
