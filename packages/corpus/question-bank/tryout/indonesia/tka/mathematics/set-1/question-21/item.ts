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
          label: "$$3\\sqrt2$$",
        },
        {
          isCorrect: true,
          label: "$$3\\sqrt{3}$$",
        },
        {
          isCorrect: false,
          label: "$$6$$",
        },
        {
          isCorrect: false,
          label: "$$3\\sqrt5$$",
        },
        {
          isCorrect: false,
          label: "$$9$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$3\\sqrt2$$",
        },
        {
          isCorrect: true,
          label: "$$3\\sqrt{3}$$",
        },
        {
          isCorrect: false,
          label: "$$6$$",
        },
        {
          isCorrect: false,
          label: "$$3\\sqrt5$$",
        },
        {
          isCorrect: false,
          label: "$$9$$",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$3\\sqrt2$$",
        },
        {
          isCorrect: true,
          label: "$$3\\sqrt{3}$$",
        },
        {
          isCorrect: false,
          label: "$$6$$",
        },
        {
          isCorrect: false,
          label: "$$3\\sqrt5$$",
        },
        {
          isCorrect: false,
          label: "$$9$$",
        },
      ],
    },
  },
};

export default item;
