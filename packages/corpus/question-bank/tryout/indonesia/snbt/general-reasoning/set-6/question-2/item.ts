import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Oktober",
        },
        {
          isCorrect: false,
          label: "November",
        },
        {
          isCorrect: false,
          label: "Januar",
        },
        {
          isCorrect: true,
          label: "Dezember",
        },
        {
          isCorrect: false,
          label: "Februar",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "October" },
        { isCorrect: false, label: "November" },
        { isCorrect: false, label: "January" },
        { isCorrect: true, label: "December" },
        { isCorrect: false, label: "February" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "Oktober" },
        { isCorrect: false, label: "November" },
        { isCorrect: false, label: "Januari" },
        { isCorrect: true, label: "Desember" },
        { isCorrect: false, label: "Februari" },
      ],
    },
  },
};

export default item;
