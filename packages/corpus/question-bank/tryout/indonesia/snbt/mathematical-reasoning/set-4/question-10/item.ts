import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$12$$",
        },
        {
          isCorrect: false,
          label: "$$14$$",
        },
        {
          isCorrect: false,
          label: "$$16$$",
        },
        {
          isCorrect: true,
          label: "$$20$$",
        },
        {
          isCorrect: false,
          label: "$$24$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$12$$" },
        { isCorrect: false, label: "$$14$$" },
        { isCorrect: false, label: "$$16$$" },
        { isCorrect: true, label: "$$20$$" },
        { isCorrect: false, label: "$$24$$" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$12$$" },
        { isCorrect: false, label: "$$14$$" },
        { isCorrect: false, label: "$$16$$" },
        { isCorrect: true, label: "$$20$$" },
        { isCorrect: false, label: "$$24$$" },
      ],
    },
  },
};

export default item;
