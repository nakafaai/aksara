import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$36$$",
        },
        {
          isCorrect: true,
          label: "$$40$$",
        },
        {
          isCorrect: false,
          label: "$$44$$",
        },
        {
          isCorrect: false,
          label: "$$50$$",
        },
        {
          isCorrect: false,
          label: "$$52$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$36$$" },
        { isCorrect: true, label: "$$40$$" },
        { isCorrect: false, label: "$$44$$" },
        { isCorrect: false, label: "$$50$$" },
        { isCorrect: false, label: "$$52$$" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$36$$" },
        { isCorrect: true, label: "$$40$$" },
        { isCorrect: false, label: "$$44$$" },
        { isCorrect: false, label: "$$50$$" },
        { isCorrect: false, label: "$$52$$" },
      ],
    },
  },
};

export default item;
