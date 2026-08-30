import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$6$$",
        },
        {
          isCorrect: false,
          label: "$$8$$",
        },
        {
          isCorrect: false,
          label: "$$9$$",
        },
        {
          isCorrect: false,
          label: "$$10$$",
        },
        {
          isCorrect: false,
          label: "$$11$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: true, label: "$$6$$" },
        { isCorrect: false, label: "$$8$$" },
        { isCorrect: false, label: "$$9$$" },
        { isCorrect: false, label: "$$10$$" },
        { isCorrect: false, label: "$$11$$" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: true, label: "$$6$$" },
        { isCorrect: false, label: "$$8$$" },
        { isCorrect: false, label: "$$9$$" },
        { isCorrect: false, label: "$$10$$" },
        { isCorrect: false, label: "$$11$$" },
      ],
    },
  },
};

export default item;
