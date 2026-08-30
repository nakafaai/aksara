import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$64$$",
        },
        {
          isCorrect: false,
          label: "$$70$$",
        },
        {
          isCorrect: false,
          label: "$$72$$",
        },
        {
          isCorrect: false,
          label: "$$76$$",
        },
        {
          isCorrect: false,
          label: "$$0$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: true, label: "$$64$$" },
        { isCorrect: false, label: "$$70$$" },
        { isCorrect: false, label: "$$72$$" },
        { isCorrect: false, label: "$$76$$" },
        { isCorrect: false, label: "$$0$$" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: true, label: "$$64$$" },
        { isCorrect: false, label: "$$70$$" },
        { isCorrect: false, label: "$$72$$" },
        { isCorrect: false, label: "$$76$$" },
        { isCorrect: false, label: "$$0$$" },
      ],
    },
  },
};

export default item;
