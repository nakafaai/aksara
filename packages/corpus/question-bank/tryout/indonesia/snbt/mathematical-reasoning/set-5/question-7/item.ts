import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$47$$",
        },
        {
          isCorrect: false,
          label: "$$51$$",
        },
        {
          isCorrect: true,
          label: "$$85$$",
        },
        {
          isCorrect: false,
          label: "$$90$$",
        },
        {
          isCorrect: false,
          label: "$$92$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$47$$" },
        { isCorrect: false, label: "$$51$$" },
        { isCorrect: true, label: "$$85$$" },
        { isCorrect: false, label: "$$90$$" },
        { isCorrect: false, label: "$$92$$" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$47$$" },
        { isCorrect: false, label: "$$51$$" },
        { isCorrect: true, label: "$$85$$" },
        { isCorrect: false, label: "$$90$$" },
        { isCorrect: false, label: "$$92$$" },
      ],
    },
  },
};

export default item;
