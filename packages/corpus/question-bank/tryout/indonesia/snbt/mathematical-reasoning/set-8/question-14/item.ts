import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$(-2,3)$$",
        },
        {
          isCorrect: false,
          label: "$$(2,-3)$$",
        },
        {
          isCorrect: false,
          label: "$$(3,-2)$$",
        },
        {
          isCorrect: false,
          label: "$$(3,2)$$",
        },
        {
          isCorrect: true,
          label: "$$(-3,2)$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$(-2,3)$$",
        },
        {
          isCorrect: false,
          label: "$$(2,-3)$$",
        },
        {
          isCorrect: false,
          label: "$$(3,-2)$$",
        },
        {
          isCorrect: false,
          label: "$$(3,2)$$",
        },
        {
          isCorrect: true,
          label: "$$(-3,2)$$",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$(-2,3)$$",
        },
        {
          isCorrect: false,
          label: "$$(2,-3)$$",
        },
        {
          isCorrect: false,
          label: "$$(3,-2)$$",
        },
        {
          isCorrect: false,
          label: "$$(3,2)$$",
        },
        {
          isCorrect: true,
          label: "$$(-3,2)$$",
        },
      ],
    },
  },
};

export default item;
