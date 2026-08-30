import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$6 \\text{ cm}$$",
        },
        {
          isCorrect: false,
          label: "$$7 \\text{ cm}$$",
        },
        {
          isCorrect: false,
          label: "$$8 \\text{ cm}$$",
        },
        {
          isCorrect: true,
          label: "$$9 \\text{ cm}$$",
        },
        {
          isCorrect: false,
          label: "$$10 \\text{ cm}$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$6 \\text{ cm}$$" },
        { isCorrect: false, label: "$$7 \\text{ cm}$$" },
        { isCorrect: false, label: "$$8 \\text{ cm}$$" },
        { isCorrect: true, label: "$$9 \\text{ cm}$$" },
        { isCorrect: false, label: "$$10 \\text{ cm}$$" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$6 \\text{ cm}$$" },
        { isCorrect: false, label: "$$7 \\text{ cm}$$" },
        { isCorrect: false, label: "$$8 \\text{ cm}$$" },
        { isCorrect: true, label: "$$9 \\text{ cm}$$" },
        { isCorrect: false, label: "$$10 \\text{ cm}$$" },
      ],
    },
  },
};

export default item;
