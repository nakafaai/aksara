import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$150\\sqrt{3} \\text{ m/s}$$",
        },
        {
          isCorrect: false,
          label: "$$300\\sqrt{3} \\text{ m/s}$$",
        },
        {
          isCorrect: true,
          label: "$$100(\\sqrt{3}-1) \\text{ m/s}$$",
        },
        {
          isCorrect: false,
          label: "$$450\\sqrt{3} \\text{ m/s}$$",
        },
        {
          isCorrect: false,
          label: "$$250\\sqrt{3} \\text{ m/s}$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$150\\sqrt{3} \\text{ m/s}$$" },
        { isCorrect: false, label: "$$300\\sqrt{3} \\text{ m/s}$$" },
        { isCorrect: true, label: "$$100(\\sqrt{3}-1) \\text{ m/s}$$" },
        { isCorrect: false, label: "$$450\\sqrt{3} \\text{ m/s}$$" },
        { isCorrect: false, label: "$$250\\sqrt{3} \\text{ m/s}$$" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$150\\sqrt{3} \\text{ m/s}$$" },
        { isCorrect: false, label: "$$300\\sqrt{3} \\text{ m/s}$$" },
        { isCorrect: true, label: "$$100(\\sqrt{3}-1) \\text{ m/s}$$" },
        { isCorrect: false, label: "$$450\\sqrt{3} \\text{ m/s}$$" },
        { isCorrect: false, label: "$$250\\sqrt{3} \\text{ m/s}$$" },
      ],
    },
  },
};

export default item;
