import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$72$$",
        },
        {
          isCorrect: false,
          label: "$$96$$",
        },
        {
          isCorrect: true,
          label: "$$108$$",
        },
        {
          isCorrect: false,
          label: "$$144$$",
        },
        {
          isCorrect: false,
          label: "$$180$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$72$$" },
        { isCorrect: false, label: "$$96$$" },
        { isCorrect: true, label: "$$108$$" },
        { isCorrect: false, label: "$$144$$" },
        { isCorrect: false, label: "$$180$$" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$72$$" },
        { isCorrect: false, label: "$$96$$" },
        { isCorrect: true, label: "$$108$$" },
        { isCorrect: false, label: "$$144$$" },
        { isCorrect: false, label: "$$180$$" },
      ],
    },
  },
};

export default item;
