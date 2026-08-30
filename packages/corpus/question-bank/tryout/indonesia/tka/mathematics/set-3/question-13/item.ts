import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "geometry-measurement",
    topic: "geometry-transformations",
  },
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$(10,4)$$",
        },
        {
          isCorrect: false,
          label: "$$(9,4)$$",
        },
        {
          isCorrect: false,
          label: "$$(10,3)$$",
        },
        {
          isCorrect: false,
          label: "$$(11,4)$$",
        },
        {
          isCorrect: false,
          label: "$$(10,5)$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$(10,4)$$",
        },
        {
          isCorrect: false,
          label: "$$(9,4)$$",
        },
        {
          isCorrect: false,
          label: "$$(10,3)$$",
        },
        {
          isCorrect: false,
          label: "$$(11,4)$$",
        },
        {
          isCorrect: false,
          label: "$$(10,5)$$",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$(10,4)$$",
        },
        {
          isCorrect: false,
          label: "$$(9,4)$$",
        },
        {
          isCorrect: false,
          label: "$$(10,3)$$",
        },
        {
          isCorrect: false,
          label: "$$(11,4)$$",
        },
        {
          isCorrect: false,
          label: "$$(10,5)$$",
        },
      ],
    },
  },
};

export default item;
