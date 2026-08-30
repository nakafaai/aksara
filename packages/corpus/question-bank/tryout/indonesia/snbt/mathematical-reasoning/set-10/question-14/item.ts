import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$(5,-4)$$",
        },
        {
          isCorrect: false,
          label: "$$(5,4)$$",
        },
        {
          isCorrect: false,
          label: "$$(-4,5)$$",
        },
        {
          isCorrect: false,
          label: "$$(4,-5)$$",
        },
        {
          isCorrect: true,
          label: "$$(-5,4)$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$(5,-4)$$",
        },
        {
          isCorrect: false,
          label: "$$(5,4)$$",
        },
        {
          isCorrect: false,
          label: "$$(-4,5)$$",
        },
        {
          isCorrect: false,
          label: "$$(4,-5)$$",
        },
        {
          isCorrect: true,
          label: "$$(-5,4)$$",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$(5,-4)$$",
        },
        {
          isCorrect: false,
          label: "$$(5,4)$$",
        },
        {
          isCorrect: false,
          label: "$$(-4,5)$$",
        },
        {
          isCorrect: false,
          label: "$$(4,-5)$$",
        },
        {
          isCorrect: true,
          label: "$$(-5,4)$$",
        },
      ],
    },
  },
};

export default item;
