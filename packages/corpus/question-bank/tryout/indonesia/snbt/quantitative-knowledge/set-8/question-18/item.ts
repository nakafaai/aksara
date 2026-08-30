import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$10 \\text{ cm}$$",
        },
        {
          isCorrect: false,
          label: "$$12 \\text{ cm}$$",
        },
        {
          isCorrect: false,
          label: "$$18 \\text{ cm}$$",
        },
        {
          isCorrect: false,
          label: "$$20 \\text{ cm}$$",
        },
        {
          isCorrect: false,
          label: "$$22 \\text{ cm}$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: true, label: "$$10 \\text{ cm}$$" },
        { isCorrect: false, label: "$$12 \\text{ cm}$$" },
        { isCorrect: false, label: "$$18 \\text{ cm}$$" },
        { isCorrect: false, label: "$$20 \\text{ cm}$$" },
        { isCorrect: false, label: "$$22 \\text{ cm}$$" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: true, label: "$$10 \\text{ cm}$$" },
        { isCorrect: false, label: "$$12 \\text{ cm}$$" },
        { isCorrect: false, label: "$$18 \\text{ cm}$$" },
        { isCorrect: false, label: "$$20 \\text{ cm}$$" },
        { isCorrect: false, label: "$$22 \\text{ cm}$$" },
      ],
    },
  },
};

export default item;
