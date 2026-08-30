import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$6 \\text{ m}$$",
        },
        {
          isCorrect: false,
          label: "$$9 \\text{ m}$$",
        },
        {
          isCorrect: false,
          label: "$$12 \\text{ m}$$",
        },
        {
          isCorrect: false,
          label: "$$16 \\text{ m}$$",
        },
        {
          isCorrect: false,
          label: "$$18 \\text{ m}$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: true, label: "$$6 \\text{ m}$$" },
        { isCorrect: false, label: "$$9 \\text{ m}$$" },
        { isCorrect: false, label: "$$12 \\text{ m}$$" },
        { isCorrect: false, label: "$$16 \\text{ m}$$" },
        { isCorrect: false, label: "$$18 \\text{ m}$$" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: true, label: "$$6 \\text{ m}$$" },
        { isCorrect: false, label: "$$9 \\text{ m}$$" },
        { isCorrect: false, label: "$$12 \\text{ m}$$" },
        { isCorrect: false, label: "$$16 \\text{ m}$$" },
        { isCorrect: false, label: "$$18 \\text{ m}$$" },
      ],
    },
  },
};

export default item;
