import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$90$$",
        },
        {
          isCorrect: false,
          label: "$$80$$",
        },
        {
          isCorrect: false,
          label: "$$70$$",
        },
        {
          isCorrect: false,
          label: "$$65$$",
        },
        {
          isCorrect: true,
          label: "$$45$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$90$$" },
        { isCorrect: false, label: "$$80$$" },
        { isCorrect: false, label: "$$70$$" },
        { isCorrect: false, label: "$$65$$" },
        { isCorrect: true, label: "$$45$$" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$90$$" },
        { isCorrect: false, label: "$$80$$" },
        { isCorrect: false, label: "$$70$$" },
        { isCorrect: false, label: "$$65$$" },
        { isCorrect: true, label: "$$45$$" },
      ],
    },
  },
};

export default item;
