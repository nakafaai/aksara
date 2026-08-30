import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$\\text{A}$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{B}$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{C}$$",
        },
        {
          isCorrect: true,
          label: "$$\\text{D}$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{E}$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$\\text{A}$$" },
        { isCorrect: false, label: "$$\\text{B}$$" },
        { isCorrect: false, label: "$$\\text{C}$$" },
        { isCorrect: true, label: "$$\\text{D}$$" },
        { isCorrect: false, label: "$$\\text{E}$$" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$\\text{A}$$" },
        { isCorrect: false, label: "$$\\text{B}$$" },
        { isCorrect: false, label: "$$\\text{C}$$" },
        { isCorrect: true, label: "$$\\text{D}$$" },
        { isCorrect: false, label: "$$\\text{E}$$" },
      ],
    },
  },
};

export default item;
