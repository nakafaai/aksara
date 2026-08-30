import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "geometry-measurement",
    topic: "geometry-objects",
  },
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$5\\sqrt2$$",
        },
        {
          isCorrect: true,
          label: "$$5\\sqrt{3}$$",
        },
        {
          isCorrect: false,
          label: "$$10$$",
        },
        {
          isCorrect: false,
          label: "$$5\\sqrt5$$",
        },
        {
          isCorrect: false,
          label: "$$15$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$5\\sqrt2$$",
        },
        {
          isCorrect: true,
          label: "$$5\\sqrt{3}$$",
        },
        {
          isCorrect: false,
          label: "$$10$$",
        },
        {
          isCorrect: false,
          label: "$$5\\sqrt5$$",
        },
        {
          isCorrect: false,
          label: "$$15$$",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$5\\sqrt2$$",
        },
        {
          isCorrect: true,
          label: "$$5\\sqrt{3}$$",
        },
        {
          isCorrect: false,
          label: "$$10$$",
        },
        {
          isCorrect: false,
          label: "$$5\\sqrt5$$",
        },
        {
          isCorrect: false,
          label: "$$15$$",
        },
      ],
    },
  },
};

export default item;
