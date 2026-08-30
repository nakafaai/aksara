import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$30\\text{ m}^2$$",
        },
        {
          isCorrect: true,
          label: "$$60\\text{ m}^2$$",
        },
        {
          isCorrect: false,
          label: "$$70\\text{ m}^2$$",
        },
        {
          isCorrect: false,
          label: "$$80\\text{ m}^2$$",
        },
        {
          isCorrect: false,
          label: "$$90\\text{ m}^2$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$30\\text{ m}^2$$" },
        { isCorrect: true, label: "$$60\\text{ m}^2$$" },
        { isCorrect: false, label: "$$70\\text{ m}^2$$" },
        { isCorrect: false, label: "$$80\\text{ m}^2$$" },
        { isCorrect: false, label: "$$90\\text{ m}^2$$" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$30\\text{ m}^2$$" },
        { isCorrect: true, label: "$$60\\text{ m}^2$$" },
        { isCorrect: false, label: "$$70\\text{ m}^2$$" },
        { isCorrect: false, label: "$$80\\text{ m}^2$$" },
        { isCorrect: false, label: "$$90\\text{ m}^2$$" },
      ],
    },
  },
};

export default item;
