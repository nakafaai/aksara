import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$90 - x$$",
        },
        {
          isCorrect: false,
          label: "$$90 - 2x$$",
        },
        {
          isCorrect: false,
          label: "$$180 - x$$",
        },
        {
          isCorrect: true,
          label: "$$180 - 2x$$",
        },
        {
          isCorrect: false,
          label: "Unbekannt",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$90 - x$$" },
        { isCorrect: false, label: "$$90 - 2x$$" },
        { isCorrect: false, label: "$$180 - x$$" },
        { isCorrect: true, label: "$$180 - 2x$$" },
        { isCorrect: false, label: "Unknown" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$90 - x$$" },
        { isCorrect: false, label: "$$90 - 2x$$" },
        { isCorrect: false, label: "$$180 - x$$" },
        { isCorrect: true, label: "$$180 - 2x$$" },
        { isCorrect: false, label: "Tidak diketahui" },
      ],
    },
  },
};

export default item;
