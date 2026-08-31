import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$\\sqrt[3]{2} : 1$$",
        },
        {
          isCorrect: false,
          label: "$$1 : \\sqrt{2}$$",
        },
        {
          isCorrect: false,
          label: "$$\\sqrt{2} : 1$$",
        },
        {
          isCorrect: false,
          label: "$$1 : \\sqrt{3}$$",
        },
        {
          isCorrect: true,
          label: "$$1 : \\sqrt[3]{2}$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$\\sqrt[3]{2} : 1$$",
        },
        {
          isCorrect: false,
          label: "$$1 : \\sqrt{2}$$",
        },
        {
          isCorrect: false,
          label: "$$\\sqrt{2} : 1$$",
        },
        {
          isCorrect: false,
          label: "$$1 : \\sqrt{3}$$",
        },
        {
          isCorrect: true,
          label: "$$1 : \\sqrt[3]{2}$$",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$\\sqrt[3]{2} : 1$$",
        },
        {
          isCorrect: false,
          label: "$$1 : \\sqrt{2}$$",
        },
        {
          isCorrect: false,
          label: "$$\\sqrt{2} : 1$$",
        },
        {
          isCorrect: false,
          label: "$$1 : \\sqrt{3}$$",
        },
        {
          isCorrect: true,
          label: "$$1 : \\sqrt[3]{2}$$",
        },
      ],
    },
  },
};

export default item;
