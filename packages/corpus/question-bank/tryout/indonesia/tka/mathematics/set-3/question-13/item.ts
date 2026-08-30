import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "algebra",
    topic: "functions",
  },
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$(2,6)$$",
        },
        {
          isCorrect: false,
          label: "$$(3,6)$$",
        },
        {
          isCorrect: true,
          label: "$$(3,5)$$",
        },
        {
          isCorrect: false,
          label: "$$(4,5)$$",
        },
        {
          isCorrect: false,
          label: "$$(4,6)$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$(2,6)$$",
        },
        {
          isCorrect: false,
          label: "$$(3,6)$$",
        },
        {
          isCorrect: true,
          label: "$$(3,5)$$",
        },
        {
          isCorrect: false,
          label: "$$(4,5)$$",
        },
        {
          isCorrect: false,
          label: "$$(4,6)$$",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$(2,6)$$",
        },
        {
          isCorrect: false,
          label: "$$(3,6)$$",
        },
        {
          isCorrect: true,
          label: "$$(3,5)$$",
        },
        {
          isCorrect: false,
          label: "$$(4,5)$$",
        },
        {
          isCorrect: false,
          label: "$$(4,6)$$",
        },
      ],
    },
  },
};

export default item;
