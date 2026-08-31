import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

// Date: 2025-11-23
const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$4$$",
        },
        {
          isCorrect: false,
          label: "$$4{,}5$$",
        },
        {
          isCorrect: true,
          label: "$$3{,}5$$",
        },
        {
          isCorrect: false,
          label: "$$5$$",
        },
        {
          isCorrect: false,
          label: "$$5{,}5$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$4$$",
        },
        {
          isCorrect: false,
          label: "$$4.5$$",
        },
        {
          isCorrect: true,
          label: "$$3.5$$",
        },
        {
          isCorrect: false,
          label: "$$5$$",
        },
        {
          isCorrect: false,
          label: "$$5.5$$",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$4$$",
        },
        {
          isCorrect: false,
          label: "$$4{,}5$$",
        },
        {
          isCorrect: true,
          label: "$$3{,}5$$",
        },
        {
          isCorrect: false,
          label: "$$5$$",
        },
        {
          isCorrect: false,
          label: "$$5{,}5$$",
        },
      ],
    },
  },
};

export default item;
