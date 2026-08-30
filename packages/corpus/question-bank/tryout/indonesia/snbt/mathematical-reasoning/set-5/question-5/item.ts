import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$640$$",
        },
        {
          isCorrect: false,
          label: "$$1280$$",
        },
        {
          isCorrect: false,
          label: "$$720$$",
        },
        {
          isCorrect: false,
          label: "$$840$$",
        },
        {
          isCorrect: true,
          label: "$$5120$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$640$$" },
        { isCorrect: false, label: "$$1280$$" },
        { isCorrect: false, label: "$$720$$" },
        { isCorrect: false, label: "$$840$$" },
        { isCorrect: true, label: "$$5120$$" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$640$$" },
        { isCorrect: false, label: "$$1280$$" },
        { isCorrect: false, label: "$$720$$" },
        { isCorrect: false, label: "$$840$$" },
        { isCorrect: true, label: "$$5120$$" },
      ],
    },
  },
};

export default item;
