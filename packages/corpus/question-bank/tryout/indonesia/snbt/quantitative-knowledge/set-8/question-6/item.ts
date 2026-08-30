import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$512$$",
        },
        {
          isCorrect: false,
          label: "$$564$$",
        },
        {
          isCorrect: false,
          label: "$$624$$",
        },
        {
          isCorrect: false,
          label: "$$720$$",
        },
        {
          isCorrect: true,
          label: "$$848$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$512$$" },
        { isCorrect: false, label: "$$564$$" },
        { isCorrect: false, label: "$$624$$" },
        { isCorrect: false, label: "$$720$$" },
        { isCorrect: true, label: "$$848$$" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$512$$" },
        { isCorrect: false, label: "$$564$$" },
        { isCorrect: false, label: "$$624$$" },
        { isCorrect: false, label: "$$720$$" },
        { isCorrect: true, label: "$$848$$" },
      ],
    },
  },
};

export default item;
